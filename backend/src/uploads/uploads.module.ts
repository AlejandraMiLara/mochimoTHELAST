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
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // Rechazar archivo
          return cb(new Error('Solo se permiten archivos de imagen'), false);
        }
        // Aceptar archivo
        cb(null, true);
      },
    }),
  ],
  exports: [MulterModule],
})
export class UploadsModule {}