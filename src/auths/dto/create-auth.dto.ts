import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  email: string;
  @IsInt()
  @IsOptional()
  otpToken: number;
  @IsString()
  password: string;
}

export class UserVerifyDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsInt()
  @IsNotEmpty()
  otpToken: number;
}
