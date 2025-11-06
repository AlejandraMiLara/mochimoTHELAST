import { IsString, IsNotEmpty} from 'class-validator';

export class CreateRequirementDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  projectId: string;
}