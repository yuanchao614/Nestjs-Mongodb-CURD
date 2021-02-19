import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestdb'), UserModule, AuthModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
