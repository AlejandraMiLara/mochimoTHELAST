import { Module } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { RequirementController } from './requirement.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [ProjectModule, TaskModule],
  providers: [RequirementService],
  controllers: [RequirementController],
})
export class RequirementModule {}
