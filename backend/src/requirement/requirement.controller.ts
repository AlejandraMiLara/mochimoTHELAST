import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { ReviewRequirementsDto } from './dto/review-requirements.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post('requirements')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  create(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) createDto: CreateRequirementDto,
  ) {
    return this.requirementService.create(user.userId, createDto);
  }

  @Get('projects/:id/requirements')
  findAllForProject(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.requirementService.findAllForProject(user.userId, projectId);
  }

  @Post('projects/:id/requirements/submit')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  submitForReview(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.requirementService.submitForReview(user.userId, projectId);
  }

  @Post('projects/:id/requirements/review')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  reviewRequirements(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
    @Body(ValidationPipe) reviewDto: ReviewRequirementsDto,
  ) {
    return this.requirementService.reviewRequirements(
      user.userId,
      projectId,
      reviewDto,
    );
  }


  @Patch('requirements/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  update(
    @GetUser() user: JwtPayload,
    @Param('id') requirementId: string,
    @Body(ValidationPipe) updateDto: UpdateRequirementDto,
  ) {
    return this.requirementService.update(
      user.userId,
      requirementId,
      updateDto,
    );
  }

  @Delete('requirements/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  remove(
    @GetUser() user: JwtPayload,
    @Param('id') requirementId: string,
  ) {
    return this.requirementService.remove(user.userId, requirementId);
  }
}