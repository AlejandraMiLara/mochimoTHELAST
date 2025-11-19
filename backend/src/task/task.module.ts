import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    CloudinaryModule,
    ProjectModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}