import { IsString, IsOptional } from 'class-validator';

export class UpdateRequirementDto {
  @IsString()
  @IsOptional()
  description?: string;
}