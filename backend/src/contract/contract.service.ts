import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ReviewContractDto, ContractReviewAction } from './dto/review-contract.dto';
import {
  ProjectStatus,
  ContractStatus,
  PaymentMode,
} from '@prisma/client';
import { TaskService } from 'src/task/task.service';
import { PrismaTx } from 'src/prisma/types';
import { Prisma } from '@prisma/client';


@Injectable()
export class ContractService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  async create(freelancerId: string, createDto: CreateContractDto) {
    const project = await this.projectService.findOneForUser(
      freelancerId,
      createDto.projectId,
    );

    if (project.status !== ProjectStatus.APPROVED) {
      throw new ForbiddenException(
        'Los requerimientos del proyecto aún no han sido aprobados',
      );
    }

    const existingContract = await this.prisma.contract.findFirst({
      where: {
        projectId: createDto.projectId,
        status: { in: [ContractStatus.DRAFT, ContractStatus.SUBMITTED] },
      },
    });

    if (existingContract) {
      throw new ConflictException(
        'Ya existe un contrato pendiente para este proyecto',
      );
    }

    const client = await this.prisma.projectClient.findFirst({
      where: { projectId: project.id },
      include: { client: true },
    });

    const freelancer = await this.prisma.user.findUnique({
      where: { id: freelancerId },
    });

    const clientName = client?.client.firstName ?? '[Cliente Pendiente]';
    const freelancerName = freelancer?.firstName ?? '[Freelancer]';

    const content = `Contrato de servicios: ${project.name}.
Freelancer: ${freelancerName}.
Cliente: ${clientName}.
Precio acordado: ${createDto.price} (${createDto.includesIva ? 'IVA incluido' : 'más IVA'}).`;

    const contract = await this.prisma.contract.create({
      data: {
        projectId: createDto.projectId,
        price: createDto.price,
        includesIva: createDto.includesIva,
        content,
        status: ContractStatus.DRAFT,
      },
    });

    return contract;
  }

  async submit(freelancerId: string, contractId: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { project: true },
    });

    if (!contract || contract.project.ownerId !== freelancerId) {
      throw new NotFoundException('Contrato no encontrado o no te pertenece');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.contract.update({
        where: { id: contractId },
        data: { status: ContractStatus.SUBMITTED },
      });

      await tx.project.update({
        where: { id: contract.projectId },
        data: { status: ProjectStatus.CONTRACT_REVIEW },
      });
    });

    return { message: 'Contrato enviado a revisión' };
  }

  async review(
    clientId: string,
    contractId: string,
    reviewDto: ReviewContractDto,
  ) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });
    if (!contract) throw new NotFoundException('Contrato no encontrado');

    const project = await this.projectService.checkProjectAccess(
      clientId,
      contract.projectId,
    );

    if (project.status !== ProjectStatus.CONTRACT_REVIEW) {
      throw new ForbiddenException('El contrato no está pendiente de revisión');
    }

    if (reviewDto.action === ContractReviewAction.APPROVE) {
      // --- APROBADO ---
      await this.prisma.$transaction(async (tx: PrismaTx) => {
        let nextProjectStatus: ProjectStatus;

        if (
          project.paymentMode === PaymentMode.UPFRONT ||
          project.paymentMode === PaymentMode.HALFHUP
        ) {
          nextProjectStatus = ProjectStatus.PAYMENT;
        } else {
          nextProjectStatus = ProjectStatus.INPROGRESS;

          await this.taskService.autoGenerateTasks(project.id, tx);
        }

        await tx.contract.update({
          where: { id: contractId },
          data: { status: ContractStatus.APPROVED },
        });

        await tx.project.update({
          where: { id: project.id },
          data: { status: nextProjectStatus },
        });
      });

      return { message: 'Contrato aprobado' };
    } else {
      if (!reviewDto.reason) {
        throw new BadRequestException('Se requiere una razón para la revisión');
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.contract.update({
          where: { id: contractId },
          data: {
            status: ContractStatus.REVISION,
            revisionReason: reviewDto.reason,
          },
        });

        await tx.project.update({
          where: { id: project.id },
          data: { status: ProjectStatus.APPROVED },
        });
      });

      return { message: 'Revisión de contrato solicitada' };
    }
  }

  async getActiveContractForProject(userId: string, projectId: string) {
    await this.projectService.checkProjectAccess(userId, projectId);

    const contract = await this.prisma.contract.findFirst({
      where: {
        projectId,
        status: {
          in: [
            ContractStatus.SUBMITTED,
            ContractStatus.APPROVED,
            ContractStatus.DRAFT,
            ContractStatus.REVISION,
          ],
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!contract) {
      throw new NotFoundException(
        'No se encontró un contrato activo para este proyecto',
      );
    }
    return contract;
  }
}
