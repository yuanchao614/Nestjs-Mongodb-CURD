import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: GridFsMulterConfigService
  })],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService]
})
export class FilesModule {}
