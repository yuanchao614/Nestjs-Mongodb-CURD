import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestdb'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
