import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';
export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsInt()
  likes: number;

  @IsInt()
  @IsOptional()
  userId?: number;


}
