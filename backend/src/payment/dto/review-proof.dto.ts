import { IsEnum, IsString, IsOptional, ValidateIf } from 'class-validator';

export enum ProofReviewAction {
  APPROVE = 'APPROVE',
  REQUEST_REVISION = 'REQUEST_REVISION',
}

export class ReviewProofDto {
  @IsEnum(ProofReviewAction)
  action: ProofReviewAction;

  @ValidateIf((o) => o.action === ProofReviewAction.REQUEST_REVISION)
  @IsString()
  @IsOptional()
  reason?: string;
}