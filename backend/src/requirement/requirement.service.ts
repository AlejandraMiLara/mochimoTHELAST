import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { ReviewRequirementsDto, ReviewAction } from './dto/review-requirements.dto';
import { ProjectStatus, RequirementStatus, Role } from '@prisma/client';


@Injectable()
export class RequirementService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

  async create(freelancerId: string, createDto: CreateRequirementDto) {
    const project = await this.projectService.findOneForUser(
      freelancerId,
      createDto.projectId,
    );

    if (project.status !== ProjectStatus.PENDING) {
      throw new ForbiddenException(
        'No puedes añadir requerimientos en esta etapa del proyecto',
      );
    }

    return this.prisma.requirement.create({
      data: {
        description: createDto.description,
        projectId: createDto.projectId,
        status: RequirementStatus.PENDING,
      },
    });
  }

  async findAllForProject(userId: string, projectId: string) {
    await this.projectService.checkProjectAccess(userId, projectId);

    return this.prisma.requirement.findMany({
      where: { projectId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async submitForReview(freelancerId: string, projectId: string) {
    await this.projectService.findOneForUser(freelancerId, projectId);

    await this.prisma.requirement.updateMany({
      where: {
        projectId,
        status: { in: [RequirementStatus.PENDING, RequirementStatus.REVISION] },
      },
      data: {
        status: RequirementStatus.SUBMITTED,
        revisionReason: null,
      },
    });

    return this.prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.REVIEW },
    });
  }

  async reviewRequirements(
    clientId: string,
    projectId: string,
    reviewDto: ReviewRequirementsDto,
  ) {
    const project = await this.projectService.checkProjectAccess(
      clientId,
      projectId,
    );

    if (project.status !== ProjectStatus.REVIEW) {
      throw new ForbiddenException(
        'El proyecto no está en espera de revisión',
      );
    }

    if (reviewDto.action === ReviewAction.APPROVE) {
      await this.prisma.requirement.updateMany({
        where: { projectId, status: RequirementStatus.SUBMITTED },
        data: { status: RequirementStatus.APPROVED },
      });
      return this.prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.APPROVED },
      });
    } else {
      if (!reviewDto.reason) {
        throw new BadRequestException('Se requiere una razón para la revisión');
      }
      await this.prisma.requirement.updateMany({
        where: { projectId, status: RequirementStatus.SUBMITTED },
        data: {
          status: RequirementStatus.REVISION,
          revisionReason: reviewDto.reason,
        },
      });
      return this.prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.PENDING },
      });
    }
  }

  private async checkRequirementOwnership(
    freelancerId: string,
    requirementId: string,
  ) {
    const requirement = await this.prisma.requirement.findUnique({
      where: { id: requirementId },
      include: { project: true },
    });

    if (!requirement) {
      throw new NotFoundException('Requerimiento no encontrado');
    }

    if (requirement.project.ownerId !== freelancerId) {
      throw new ForbiddenException(
        'No tienes permiso para editar este requerimiento',
      );
    }

    if (
      requirement.status !== RequirementStatus.PENDING &&
      requirement.status !== RequirementStatus.REVISION
    ) {
      throw new ForbiddenException(
        'No puedes modificar un requerimiento que ya ha sido enviado o aprobado',
      );
    }

    return requirement;
  }

  async update(
    freelancerId: string,
    requirementId: string,
    updateDto: UpdateRequirementDto,
    ) {
    await this.checkRequirementOwnership(freelancerId, requirementId);

    return this.prisma.requirement.update({
      where: { id: requirementId },
      data: {
        description: updateDto.description,
      },
    });
  }

  async remove(freelancerId: string, requirementId: string) {
    await this.checkRequirementOwnership(freelancerId, requirementId);

    await this.prisma.requirement.delete({
      where: { id: requirementId },
    });

    return { message: 'Requerimiento eliminado exitosamente' };
  }
}