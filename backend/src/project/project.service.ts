import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, Role } from '@prisma/client';
import { PaymentMode, ProjectStatus, TaskStatus } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(
    freelancerId: string,
    createDto: CreateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...createDto,
        ownerId: freelancerId,
      },
    });
  }

  async findAllForUser(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
    });
  }

  async findOneForUser(
    userId: string,
    projectId: string,
  ): Promise<Project> {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Proyecto no encontrado o no te pertenece',
      );
    }
    return project;
  }

  async findAllForClient(clientId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        clients: {
          some: {
            clientId: clientId,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    projectId: string,
    updateDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.findOneForUser(userId, projectId);

    try {
      return await this.prisma.project.update({
        where: { id: projectId },
        data: updateDto,
      });
    } catch (error) {
      throw new NotFoundException('No se pudo actualizar el proyecto');
    }
  }

  async remove(userId: string, projectId: string): Promise<void> {
    await this.findOneForUser(userId, projectId);

    try {
      await this.prisma.project.delete({
        where: { id: projectId },
      });
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar el proyecto');
    }
  }


  async checkProjectAccess(
    userId: string,
    projectId: string,
  ): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (project.ownerId === userId) {
      return project;
    }

    const clientMembership = await this.prisma.projectClient.findUnique({
      where: {
        projectId_clientId: {
          projectId: projectId,
          clientId: userId,
        },
      },
    });

    if (clientMembership) {
      return project;
    }

    throw new ForbiddenException('No tienes acceso a este proyecto');
  }


async completeProject(freelancerId: string, projectId: string) {
    const project = await this.findOneForUser(freelancerId, projectId);

    if (project.status !== ProjectStatus.INPROGRESS) {
        throw new ForbiddenException('El proyecto no está en progreso');
    }

    const pendingTasks = await this.prisma.task.count({
        where: {
            projectId,
            status: { not: TaskStatus.DONE },
        },
    });

    if (pendingTasks > 0) {
        throw new ForbiddenException(
            'No puedes finalizar el proyecto, aún hay tareas pendientes',
        );
    }

    if (
        project.paymentMode === PaymentMode.ONFINISH ||
        project.paymentMode === PaymentMode.HALFHUP
    ) {
        await this.prisma.project.update({
            where: { id: projectId },
            data: { status: ProjectStatus.PAYMENT },
        });
        return { message: 'Proyecto finalizado, esperando pago final.' };
    } else {
        await this.prisma.project.update({
            where: { id: projectId },
            data: { status: ProjectStatus.COMPLETED },
        });
        return { message: 'Proyecto completado.' };
    }
}


async updateVisibility(
    freelancerId: string,
    projectId: string,
    isPublic: boolean,
) {
    await this.findOneForUser(freelancerId, projectId);

    return this.prisma.project.update({
        where: { id: projectId },
        data: { isPublic },
    });
}




}