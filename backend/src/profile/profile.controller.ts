import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePaymentDataDto } from './dto/update-payment-data.dto';
import type { JwtPayload } from 'src/auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
constructor(
    private profileService: ProfileService,
    private cloudinaryService: CloudinaryService
  ) {}

  @Get('me')
  async getMyProfile(
    @GetUser() user: JwtPayload,
  ) {
    const profile = await this.profileService.findProfileOptional(user.userId);

    return {
      ...user,
      bio: profile?.bio ?? '',
      avatarUrl: profile?.avatarUrl ?? '',
    };
  }

  @Put('me')
  async updateMyProfile(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) data: UpdateProfileDto,
  ) {
    return this.profileService.upsertProfile(user.userId, data);
  }

  @Get('payment')
  async getMyPaymentData(@GetUser() user: JwtPayload) {
    return this.profileService.getPaymentData(user.userId);
  }

  @Put('payment')
  async updateMyPaymentData(
    @GetUser() user: JwtPayload,
    @Body(ValidationPipe) data: UpdatePaymentDataDto,
  ) {
    return this.profileService.upsertPaymentData(user.userId, data);
  }

  @Get('project-payment/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  async getFreelancerPaymentData(
    @GetUser() user: JwtPayload,
    @Param('id') projectId: string,
  ) {
    return this.profileService.getPaymentDataForProject(
      user.userId,
      projectId,
    );
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @GetUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Se requiere imagen');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const avatarUrl = uploadResult.secure_url;

    return this.profileService.upsertProfile(user.userId, { avatarUrl });
  }

}