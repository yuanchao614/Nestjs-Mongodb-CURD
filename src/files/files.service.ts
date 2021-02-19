import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'
import { FileInfoVm } from './file-info-vm.model'

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    console.log();
    const result = await this.fileModel.findById(id)
      .then(result => result)
      // .catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
      console.log(result);
    return{
      filename: result[0].filename,
      length: result[0].length,
      chunkSize: result[0].chunkSize,
      md5: result[0].md5,
      contentType: result[0].contentType      
    }
  }

  async deleteFile(id: string): Promise<boolean>{
    return await this.fileModel.delete(id)
  }
}


