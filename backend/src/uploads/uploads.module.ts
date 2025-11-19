import { Module, Global } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Global()
@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(), 
      
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Solo se permiten archivos de imagen (jpg, jpeg, png, gif, webp)'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    }),
  ],
  exports: [MulterModule],
})
export class UploadsModule {}