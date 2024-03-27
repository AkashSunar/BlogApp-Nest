import { IsInt, IsString } from 'class-validator';
export class CreateAuthDto {
  @IsString()
  email: string;
  @IsInt()
  otpToken: number;
}
