import { IsString, IsNotEmpty, IsOptional, IsUrl, IsEnum, IsBoolean } from 'class-validator';
import { PaymentMode, ProjectStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen no es válida' })
  @Transform(({ value }) => {
    if (!value || value === 'undefined' || value === 'null' || value === '') return undefined;
    return value;
  })
  imageUrl?: string;

  @IsEnum(PaymentMode)
  @IsNotEmpty()
  paymentMode: PaymentMode;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}