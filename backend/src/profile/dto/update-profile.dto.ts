import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl({}, { message: 'Debe ser una URL válida' })
  @IsOptional()
  avatarUrl?: string;
}