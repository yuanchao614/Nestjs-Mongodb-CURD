import { IsNotEmpty, IsEmail, IsString, IsDate } from 'class-validator';
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
    @IsDate()
    @IsNotEmpty()
    public readonly createdDate: Date;
    @IsDate()
    @IsNotEmpty()
    public readonly updatedDate: Date;
}