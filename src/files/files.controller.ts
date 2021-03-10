import { Post, Get, Param, Res, Controller, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Body, Query, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileResponseVm } from './file-response-vm.model'
import { QueryFile, UpdateFile } from 'src/files/interface/fileInterface'
import { updateFileDto } from './dto/update-file-dto'
import { AuthGuard } from '@nestjs/passport';


@Controller('api/files')
export class FilesController {
  constructor(private filesService: FilesService){}
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({name: 'file', required: true, description: 'Attachment files'})
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
        const fileReponse = {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunkSize: file.chunkSize,
            size: file.size,
            md5: file.md5,
            uploadDate: file.uploadDate,
            contentType: file.contentType,
        };
        response.push(fileReponse);
    });
    return response;
}

@UseGuards(AuthGuard('jwt'))
@Get('info/:id')
    // @ApiBadRequestResponse({ type: ApiException })
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    // @ApiBadRequestResponse({ type: ApiException })
    async getFile(@Param('id') id: string, @Res() res) {        
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('download/:id')
    // @ApiBadRequestResponse({ type: ApiException })
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)        
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        } 
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res) 
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('delete/:id')
    // @ApiBadRequestResponse({ type: ApiException })
    @ApiCreatedResponse({ type: FileResponseVm })
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if(!filestream){
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }        
        return {
            message: 'File has been deleted',
            file: file
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('search')
    // @ApiBadRequestResponse({ type: ApiException })
    async getAllFile(@Body() searchParam: any, @Res() res) {      
        console.log(searchParam, 'search file param::::::::::');  
        const files = await this.filesService.findAllFile(searchParam)
        return res.status(HttpStatus.OK).json(files);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('query')
    async queryFileInfo(@Body() queryParam: QueryFile, @Query('pageIndex') pageIndex: number, @Query('pageSize') pageSize: number, @Res() res) {
        const data = await this.filesService.queryFileInfo(queryParam, Number(pageIndex) - 1, pageSize)
        return res.status(HttpStatus.OK).json(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    public async updateFile(
      @Res() res,
      @Param('id') id: string,
      @Body() updateFile: updateFileDto,
    ) {
        // console.log(userId, updateUserDto, 'update user param:::::::::::::');
      try {
        const file = await this.filesService.updateFile(
            id,
            updateFile,
        );
        if (!file) {
          throw new NotFoundException('file does not exist!');
        }
        return res.status(HttpStatus.OK).json({
          message: 'file has been successfully updated',
          file,
        });
      } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: user not updated!',
          status: 400,
        });
      }
    }
}
