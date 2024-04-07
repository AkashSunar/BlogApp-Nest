import { $Enums } from '@prisma/client';
import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsOptional()
  image: string;
  @IsString()
  @IsOptional()
  role: $Enums.Role;
  @IsInt()
  @IsOptional()
  created_by: number;
  @IsInt()
  @IsOptional()
  updated_by: number;
  @IsString()
  password: string;
  @IsBoolean()
  @IsOptional()
  isEmailVerified: boolean;
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
  @IsBoolean()
  @IsOptional()
  isArchive: boolean;
}

export class EmailVerifyDto {
  @IsBoolean()
  isEmailVerified: boolean;
}
