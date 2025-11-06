import { Module } from '@nestjs/common';
import { RequirementService } from './requirement.service';
import { RequirementController } from './requirement.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  providers: [RequirementService],
  controllers: [RequirementController]
})
export class RequirementModule {}
