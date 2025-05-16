import { IsNotEmpty, IsString } from "class-validator";

export class SignInAdminDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
