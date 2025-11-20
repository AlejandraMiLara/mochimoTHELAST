import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    ProjectModule, 
    TaskModule, 
    CloudinaryModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}