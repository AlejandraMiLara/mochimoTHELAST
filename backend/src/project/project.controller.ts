import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  create(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.projectService.create(user.userId, createProjectDto);
  }

  @Get()
  findAll(@GetUser() user: JwtPayload) {
    if (user.role === Role.FREELANCER) {
      return this.projectService.findAllForUser(user.userId);
    }

    if (user.role === Role.CLIENT) {
      return this.projectService.findAllForClient(user.userId);
    }
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
  ) {
    return this.projectService.checkProjectAccess(user.userId, id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.projectService.update(user.userId, id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  remove(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
  ) {
    return this.projectService.remove(user.userId, id);
  }

  @Get(':id/code')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  async getInvitationCode(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
  ) {
    const project = await this.projectService.findOneForUser(user.userId, id);
    return { invitationCode: project.invitationCode };
  }

  @Post(':id/complete')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  completeProject(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.projectService.completeProject(user.userId, projectId);
  }

  @Patch(':id/visibility')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  updateVisibility(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
    @Body(ValidationPipe) visibilityDto: UpdateVisibilityDto,
  ) {
    return this.projectService.updateVisibility(
      user.userId,
      projectId,
      visibilityDto.isPublic,
    );
  }
}