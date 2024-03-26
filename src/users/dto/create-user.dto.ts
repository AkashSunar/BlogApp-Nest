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
  role: $Enums.Role;
  @IsInt()
  created_by: number;
  @IsInt()
  updated_by: number;
  @IsString()
  password: string;
  @IsBoolean()
  isEmailVerified: boolean;
  @IsBoolean()
  isActive: boolean;
  @IsBoolean()
  isArchive: boolean;
}
