import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from 'src/files/schemas/fileSchemas';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: GridFsMulterConfigService
  }), MongooseModule.forFeature([{ name: 'fs.files', schema: FileSchema }])],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService]
})
export class FilesModule {}
