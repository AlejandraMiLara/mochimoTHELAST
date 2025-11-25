import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { CreateContractDto } from './dto/create-contract.dto';
import { ReviewContractDto } from './dto/review-contract.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('contracts')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  create(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) createDto: CreateContractDto,
  ) {
    return this.contractService.create(user.userId, createDto);
  }

  @Post('contracts/:id/submit')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  submit(
    @GetUser() user: JwtPayload,
    @Param('id') contractId: string,
  ) {
    return this.contractService.submit(user.userId, contractId);
  }

  @Get('projects/:id/contract')
  getActiveContract(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.contractService.getActiveContractForProject(
      user.userId,
      projectId,
    );
  }

  @Post('contracts/:id/review')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  review(
    @GetUser() user: JwtPayload,
    @Param('id') contractId: string,
    @Body(ValidationPipe) reviewDto: ReviewContractDto,
  ) {
    return this.contractService.review(user.userId, contractId, reviewDto);
  }

  @Post('contracts/:id/update')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  updateContract(
    @GetUser() user: JwtPayload,
    @Param('id') contractId: string,
    @Body(ValidationPipe) updateDto: CreateContractDto,
  ) {
    return this.contractService.updateContract(user.userId, contractId, updateDto);
  }
}