import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [ProjectModule, TaskModule],
  providers: [ContractService],
  controllers: [ContractController]
})
export class ContractModule {}
