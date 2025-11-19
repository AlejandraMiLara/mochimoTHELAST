import { Module, Global } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Global()
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Solo se permiten archivos de imagen (jpg, jpeg, png, gif, webp)'), false);
        }
      },
    }),
  ],
  exports: [MulterModule],
})
export class UploadsModule {}