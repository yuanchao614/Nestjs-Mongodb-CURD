import { IsNotEmpty, IsEmail, IsString, IsDateString } from 'class-validator';
export class createUserDto {
    @IsString()
    @IsNotEmpty()
    public readonly userName: string;
    @IsString()
    @IsNotEmpty()
    public readonly passWord: string;
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public readonly email: string;
    @IsString()
    public readonly userType: string;
    @IsDateString()
    @IsNotEmpty()
    public readonly createdDate: Date;
    @IsDateString()
    @IsNotEmpty()
    public readonly updatedDate: Date;
}