import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {} // This allows you to use methods provided by PrismaService within BlogService.
  async create(createBlogDto: CreateBlogDto) {
    const createdBlog = await this.prisma.blog.create({ data: createBlogDto });
    return { msg: 'Blog created successfully', data: createdBlog };
  }

  findAll() {
    return this.prisma.blog.findMany();
  }

  async findOne(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id:Number(id) },
    });
    return { msg: 'blog found', data: blog };
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.prisma.blog.update({
      where: { id: Number(id) },
      data: updateBlogDto,
    });
    return { msg: 'Blog updated successfully', data: updatedBlog };
  }

  remove(id: number) {
    this.prisma.blog.delete({ where: { id } });
    return { msg: 'Deleted succesfully' };
  }
}
