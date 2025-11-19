import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { RequirementStatus, TaskStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaTx } from 'src/prisma/types';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

  async autoGenerateTasks(projectId: string, tx?: PrismaTx) {
    const prisma = tx || this.prisma;

    const requirements = await prisma.requirement.findMany({
      where: {
        projectId,
        status: RequirementStatus.APPROVED,
      },
    });

    for (const req of requirements) {
      const existingTask = await prisma.task.findUnique({
        where: { requirementId: req.id },
      });

      if (!existingTask) {
        await prisma.task.create({
          data: {
            projectId: req.projectId,
            requirementId: req.id,
            status: TaskStatus.TODO,
          },
        });
      }
    }

    const tasksCount = await prisma.task.count({
      where: { projectId },
    });

    console.log(`Total tasks for project ${projectId}: ${tasksCount}`);
  }

  async findAllForProject(userId: string, projectId: string) {
    await this.projectService.checkProjectAccess(userId, projectId);

    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        requirement: {
          select: {
            id: true,
            description: true,
            status: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    console.log(`Found ${tasks.length} tasks for project ${projectId}`);
    return tasks;
  }

  async updateStatus(freelancerId: string, taskId: string, status: TaskStatus) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) throw new NotFoundException('Tarea no encontrada');
    if (task.project.ownerId !== freelancerId) {
      throw new ForbiddenException('No tienes permiso para editar esta tarea');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status },
      include: {
        requirement: {
          select: {
            id: true,
            description: true,
            status: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async addTaskImage(freelancerId: string, taskId: string, imageUrl: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) throw new NotFoundException('Tarea no encontrada');
    if (task.project.ownerId !== freelancerId) {
      throw new ForbiddenException('No tienes permiso para editar esta tarea');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { imageUrl },
      include: {
        requirement: {
          select: {
            id: true,
            description: true,
            status: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
