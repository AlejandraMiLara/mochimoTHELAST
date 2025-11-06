import { IsString } from 'class-validator';

export class UpdatePaymentDataDto {
  @IsString()
  bankName: string;

  @IsString()
  accountHolder: string;

  @IsString()
  accountNumber: string;
}