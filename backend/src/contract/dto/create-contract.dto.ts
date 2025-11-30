import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContractDto {
  @IsNotEmpty()
  projectId: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  price: number;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  includesIva: boolean;

  @IsOptional()
  @IsString()
  content?: string;
}
