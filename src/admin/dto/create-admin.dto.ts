import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  @IsString()
  phone_number: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
