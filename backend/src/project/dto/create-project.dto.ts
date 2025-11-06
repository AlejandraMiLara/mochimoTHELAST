import { IsString, IsNotEmpty, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { PaymentMode } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsEnum(PaymentMode)
  @IsNotEmpty()
  paymentMode: PaymentMode;
}