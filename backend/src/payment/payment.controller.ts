import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentService } from './payment.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; // 👈 1. Importar
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { ReviewProofDto } from './dto/review-proof.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('projects/:id/upload-proof')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProof(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    
    if (!file) {
      throw new BadRequestException('Se requiere un archivo de imagen');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const imageUrl = uploadResult.secure_url; 

    return this.paymentService.uploadProof(user.userId, projectId, imageUrl);
  }

  @Post('proofs/:id/review')
  @UseGuards(RolesGuard)
  @Roles(Role.FREELANCER)
  reviewProof(
    @GetUser() user: JwtPayload,
    @Param('id') proofId: string,
    @Body(ValidationPipe) reviewDto: ReviewProofDto,
  ) {
    return this.paymentService.reviewProof(user.userId, proofId, reviewDto);
  }

  @Get('projects/:id/proofs')
  getProofs(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.paymentService.getProofsForProject(user.userId, projectId);
  }
}