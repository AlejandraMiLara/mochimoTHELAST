import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskStatus, RequirementStatus, Role } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async getPortfolio(userId: string) {
    const freelancerProfile = await this.prisma.user.findUnique({
      where: { id: userId, role: Role.FREELANCER },
      select: {
        firstName: true,
        lastName: true,
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
      select: {
        name: true,
        description: true,
        imageUrl: true,
        status: true,
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

    return {
      freelancer: freelancerProfile,
      projects: projects,
    };
  }
}