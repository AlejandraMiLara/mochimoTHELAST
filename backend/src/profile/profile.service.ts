import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Profile, PaymentData } from '@prisma/client';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ProfileService {
constructor(
    private prisma: PrismaService,
    private projectService: ProjectService, 
  ) {}

  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }
    return profile;
  }

  async findProfileOptional(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
    });
  }

  async upsertProfile(
    userId: string,
    data: { bio?: string; avatarUrl?: string },
  ): Promise<Profile> {
    return this.prisma.profile.upsert({
      where: { userId },
      update: {
        ...(data.bio !== undefined ? { bio: data.bio ?? '' } : {}),
        ...(data.avatarUrl !== undefined
          ? { avatarUrl: data.avatarUrl ?? '' }
          : {}),
      },
      create: {
        userId,
        bio: data.bio ?? '',
        avatarUrl: data.avatarUrl ?? '',
      },
    });
  }

  async getPaymentData(userId: string): Promise<PaymentData> {
    const paymentData = await this.prisma.paymentData.findUnique({
      where: { userId },
    });
    if (!paymentData) {
      throw new NotFoundException('Datos de pago no encontrados');
    }
    return paymentData;
  }

  async upsertPaymentData(
    userId: string,
    data: { bankName: string; accountHolder: string; accountNumber: string },
  ): Promise<PaymentData> {
    return this.prisma.paymentData.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  async getPaymentDataForProject(
    clientId: string,
    projectId: string,
  ): Promise<PaymentData> {
    const project = await this.projectService.checkProjectAccess(
      clientId,
      projectId,
    );

    const paymentData = await this.prisma.paymentData.findUnique({
      where: { userId: project.ownerId },
    });

    if (!paymentData) {
      throw new NotFoundException(
        'El freelancer de este proyecto no ha configurado sus datos de pago.',
      );
    }

    return paymentData;
  }

}
