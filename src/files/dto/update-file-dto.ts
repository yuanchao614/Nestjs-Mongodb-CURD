import { IsNotEmpty, IsEmail, IsString, IsDateString, IsNumber } from 'class-validator';
export class updateFileDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly length: number;
    @IsNumber()
    @IsNotEmpty()
    public readonly chunkSize: number;
    @IsString()
    @IsNotEmpty()
    public readonly filename: string;
    @IsString()
    @IsNotEmpty()
    public readonly md5: string;
    @IsString()
    public readonly description: string;
    @IsString()
    @IsNotEmpty()
    public readonly contentType: string;
    @IsDateString()
    @IsNotEmpty()
    public readonly uploadDate: Date;
}