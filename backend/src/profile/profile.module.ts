import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProjectModule } from 'src/project/project.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [ProjectModule, CloudinaryModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
