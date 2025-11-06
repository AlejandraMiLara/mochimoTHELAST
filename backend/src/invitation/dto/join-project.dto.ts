import { IsString, IsNotEmpty } from 'class-validator';

export class JoinProjectDto {
  @IsString()
  @IsNotEmpty()
  invitationCode: string;
}