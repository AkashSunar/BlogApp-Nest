import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenExtractor } from 'src/utils/token.extractor';
import { JwtService } from 'src/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { BlogEntity } from './entities/blog.entity';
@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private tokenExtractor: TokenExtractor,
    private jwtService: JwtService,
  ) {} // This allows you to use methods provided by PrismaService within BlogService.
  async create(createBlogDto: CreateBlogDto) {
    const createdBlog = await this.prisma.blog.create({ data: createBlogDto });
    return { msg: 'Blog created successfully', data: createdBlog };
  }

  async findAll(req) {
    const token = this.tokenExtractor.extractToken(req);
    const userData = this.jwtService.verifyJwt(token) as JwtPayload;
    const { id } = userData.data;
    return await this.prisma.blog.findMany({
      where: { userId: id },
    });
  }

  async update(blogId: number, updateBlogDto: UpdateBlogDto, req: any) {
    const token = this.tokenExtractor.extractToken(req);
    const userData = this.jwtService.verifyJwt(token) as JwtPayload;
    const creatorId = userData.data.id;
    const blogToBeUpdated = await this.prisma.blog.findUnique({
      where: {
        id: Number(blogId),
      },
    });
    if (!blogToBeUpdated)
      throw new HttpException(
        'Blog you want to update is not found',
        HttpStatus.BAD_REQUEST,
      );
    if (creatorId !== blogToBeUpdated.userId)
      throw new HttpException(
        'This Blog is not created by the user you provider',
        HttpStatus.BAD_REQUEST,
      );
    const updatedBlog = await this.prisma.blog.update({
      where: { id: Number(blogId) },
      data: updateBlogDto,
    });
    return { msg: 'Blog updated successfully', data: updatedBlog };
  }

  async remove(blogId: number, req) {
    const token = this.tokenExtractor.extractToken(req);
    const userData = this.jwtService.verifyJwt(token) as JwtPayload;
    const creatorId = userData.data.id;
    const blogToBedeleted = await this.prisma.blog.findUnique({
      where: { id: Number(blogId) },
    });
    if (!blogToBedeleted)
      throw new HttpException(
        'Blog you want to delete is not found',
        HttpStatus.BAD_REQUEST,
      );
    if (creatorId !== blogToBedeleted.userId)
      throw new HttpException(
        'This Blog is not created by the user you provider',
        HttpStatus.BAD_REQUEST,
      );
    await this.prisma.blog.delete({ where: { id: Number(blogId) } });
    return { msg: 'Deleted succesfully' };
  }
}
