import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'
import { FileInfoVm } from './file-info-vm.model'
import { Model } from 'mongoose';
import { QueryFile, QueryResult } from 'src/files/interface/fileInterface'

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection, @InjectModel('fs.files') private filesModel: Model<any>) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    console.log(id);
    const result = await this.fileModel.findById(id)
      .then(result => result)
      .catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
      console.log(result);
    return{
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType      
    }
  }

  async deleteFile(id: string): Promise<boolean>{
    return await this.fileModel.delete(id)
  }

  /**
   * {filename: 'test.png'}
   * contentType: 文件类型
   * filename：文件名
   * @param searchParam 
   */
  async findAllFile(searchParam = {}): Promise<any> {
    let param = {}
    if (Object.getOwnPropertyNames(searchParam).length) {
      for (const key in searchParam) {
        if (searchParam.hasOwnProperty(key)) {
          param[key] = searchParam[key];
        }
      }
    }
    const result = await this.fileModel.find(param)
    return result;
  }

  async queryFileInfo(query: QueryFile = {}, pageIndex: number, pageSize: number): Promise<QueryResult> {
    console.log(query, pageIndex, pageSize);
    const total = await this.filesModel.count();
    const data = await this.filesModel.find(query)
    .skip(Number(pageSize) * Number(pageIndex))
    .limit(Number(pageSize))
    return {
      total,
      data
    }
  }
}


