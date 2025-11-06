import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';
import { ReviewProofDto, ProofReviewAction } from './dto/review-proof.dto';
import {
  ProjectStatus,
  PaymentProofStatus,
  PaymentMode,
} from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  async uploadProof(
    clientId: string,
    projectId: string,
    imageUrl: string,
  ) {
    const project = await this.projectService.checkProjectAccess(
      clientId,
      projectId,
    );
    if (project.status !== ProjectStatus.PAYMENT) {
      throw new ForbiddenException(
        'El proyecto no está actualmente en espera de pago',
      );
    }

    await this.prisma.paymentProof.updateMany({
      where: { projectId, status: PaymentProofStatus.PENDING },
      data: { status: PaymentProofStatus.REVISION },
    });

    return this.prisma.paymentProof.create({
      data: {
        projectId,
        imageUrl,
        status: PaymentProofStatus.PENDING,
      },
    });
  }

async reviewProof(
    freelancerId: string,
    proofId: string,
    reviewDto: ReviewProofDto,
) {
    const proof = await this.prisma.paymentProof.findUnique({
        where: { id: proofId },
        include: { project: true },
    });

    if (!proof) throw new NotFoundException('Comprobante no encontrado');

    if (proof.project.ownerId !== freelancerId) {
        throw new ForbiddenException('No tienes permiso para esta acción');
    }

    if (proof.status !== PaymentProofStatus.PENDING) {
        throw new ForbiddenException('Este comprobante ya ha sido revisado');
    }

    if (reviewDto.action === ProofReviewAction.APPROVE) {
        // --- APROBADO ---
        await this.prisma.$transaction(async (tx) => {
            await tx.paymentProof.update({
                where: { id: proofId },
                data: { status: PaymentProofStatus.APPROVED },
            });

            const tasksCount = await tx.task.count({
                where: { projectId: proof.projectId },
            });

            if (tasksCount === 0) {
                await tx.project.update({
                    where: { id: proof.projectId },
                    data: { status: ProjectStatus.INPROGRESS },
                });
                await this.taskService.autoGenerateTasks(proof.projectId, tx);
            } else {
                await tx.project.update({
                    where: { id: proof.projectId },
                    data: { status: ProjectStatus.COMPLETED },
                });
            }
        });

        return { message: 'Pago aprobado' };
    } else {
        // --- SOLICITA REVISION ---
        if (!reviewDto.reason) {
            throw new BadRequestException('Se requiere una razón para la revisión');
        }

        await this.prisma.paymentProof.update({
            where: { id: proofId },
            data: {
                status: PaymentProofStatus.REVISION,
                revisionReason: reviewDto.reason,
            },
        });

        return { message: 'Revisión solicitada al cliente' };
    }
}

  async getProofsForProject(userId: string, projectId: string) {
    await this.projectService.checkProjectAccess(userId, projectId);
    
    return this.prisma.paymentProof.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }
}