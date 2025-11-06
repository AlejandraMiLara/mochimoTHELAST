import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
