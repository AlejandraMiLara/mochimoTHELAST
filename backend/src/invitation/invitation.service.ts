import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvitationService {
  constructor(private prisma: PrismaService) {}

  async joinProject(clientId: string, invitationCode: string) {
    const project = await this.prisma.project.findUnique({
      where: { invitationCode },
    });

    if (!project) {
      throw new NotFoundException('El código de invitación no es válido');
    }

    if (project.ownerId === clientId) {
      throw new ForbiddenException(
        'No puedes unirte a tu propio proyecto como cliente',
      );
    }

    const existingMembership = await this.prisma.projectClient.findUnique({
      where: {
        projectId_clientId: {
          projectId: project.id,
          clientId: clientId,
        },
      },
    });

    if (existingMembership) {
      throw new ConflictException('Ya eres miembro de este proyecto');
    }

    await this.prisma.projectClient.create({
      data: {
        projectId: project.id,
        clientId: clientId,
      },
    });

    return { message: 'Te has unido al proyecto exitosamente' };
  }
}