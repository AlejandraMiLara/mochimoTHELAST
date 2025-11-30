import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskStatus, RequirementStatus, Role } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async getPortfolio(userId: string) {
    const freelancerProfile = await this.prisma.user.findUnique({
      where: { 
        id: userId, role: Role.FREELANCER
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        profile: {
          select: {
            bio: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!freelancerProfile) {
      throw new NotFoundException('Freelancer no encontrado');
    }

    const projects = await this.prisma.project.findMany({
      where: {
        ownerId: userId,
        isPublic: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        status: true,
        createdAt: true,
        requirements: {
          where: { status: RequirementStatus.APPROVED },
          select: { description: true },
        },
        tasks: {
          where: {
            status: TaskStatus.DONE,
            imageUrl: { not: null },
          },
          select: {
            imageUrl: true,
            requirement: { 
              select: { description: true } 
            },
          },
        },
      },
    });

    return {
      freelancer: freelancerProfile,
      projects: projects,
    };
  }

  async getPublicProject(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { 
        id: projectId,
        isPublic: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        status: true,
        createdAt: true,
        paymentMode: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profile: { select: { avatarUrl: true } }
          }
        },
        requirements: {
          where: { status: RequirementStatus.APPROVED },
          select: { description: true },
        },
        tasks: {
          where: {
            status: TaskStatus.DONE,
            imageUrl: { not: null },
          },
          select: {
            imageUrl: true,
            requirement: { select: { description: true } },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado o es privado');
    }

    return project;
  }


}