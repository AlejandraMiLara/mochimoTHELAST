import { IsEnum, IsString, IsOptional, ValidateIf } from 'class-validator';

export enum ReviewAction {
  APPROVE = 'APPROVE',
  REQUEST_REVISION = 'REQUEST_REVISION',
}

export class ReviewRequirementsDto {
  @IsEnum(ReviewAction)
  action: ReviewAction;

  @ValidateIf((o) => o.action === ReviewAction.REQUEST_REVISION)
  @IsString()
  @IsOptional()
  reason?: string;
}