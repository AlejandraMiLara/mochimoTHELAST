import { IsBoolean, IsNotEmpty, IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  projectId: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  includesIva: boolean;

  @IsOptional()
  @IsString()
  content?: string;
}
