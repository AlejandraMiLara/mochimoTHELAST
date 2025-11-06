import { IsEnum, IsString, IsOptional, ValidateIf } from 'class-validator';

export enum ContractReviewAction {
  APPROVE = 'APPROVE',
  REQUEST_REVISION = 'REQUEST_REVISION',
}

export class ReviewContractDto {
  @IsEnum(ContractReviewAction)
  action: ContractReviewAction;

  @ValidateIf((o) => o.action === ContractReviewAction.REQUEST_REVISION)
  @IsString()
  @IsOptional()
  reason?: string;
}