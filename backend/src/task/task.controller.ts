import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('projects/:id/tasks')
  findAllForProject(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.taskService.findAllForProject(user.userId, projectId);
  }

  @Patch('tasks/:id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  updateStatus(
    @GetUser() user: JwtPayload,
    @Param('id') taskId: string,
    @Body(ValidationPipe) updateDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateStatus(user.userId, taskId, updateDto.status);
  }

  @Post('tasks/:id/image')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  @UseInterceptors(FileInterceptor('file'))
  uploadTaskImage(
    @GetUser() user: JwtPayload,
    @Param('id') taskId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Se requiere un archivo de imagen');
    }
    const imageUrl = file.path;

    return this.taskService.addTaskImage(user.userId, taskId, imageUrl);
  }
}