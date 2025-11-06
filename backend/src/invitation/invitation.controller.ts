import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { JoinProjectDto } from './dto/join-project.dto';

@Controller('invitations')
@UseGuards(JwtAuthGuard)
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}


  @Post('join')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  joinProject(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) joinProjectDto: JoinProjectDto,
  ) {
    return this.invitationService.joinProject(
      user.userId,
      joinProjectDto.invitationCode,
    );
  }
}