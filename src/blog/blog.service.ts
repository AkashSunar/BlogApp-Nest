import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenExtractor } from 'src/utils/token.extractor';
import { JwtService } from 'src/utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { type, userInfo } from 'os';
import { BlogEntity } from './entities/blog.entity';
import { UserEntity } from 'src/users/entities/user.entity';
// import { request } from 'http';
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

  findAll(req) {
    const token = this.tokenExtractor.extractToken(req);
    const userData = this.jwtService.verifyJwt(token) as JwtPayload;
    const { id } = userData.data;
    return this.prisma.blog.findMany({
      where: { userId: id } as BlogEntity,
    });
  }

  async findOne(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: Number(id) },
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

  async remove(req, id: number) {
    const token = this.tokenExtractor.extractToken(req);
    const userData = this.jwtService.verifyJwt(token) as JwtPayload;
    const creatorId = userData.data.id;
    // console.log(creatorId, 'user id from token');
    // console.log(typeof id), 'checking from blogservice';
    const blogToBedeleted = await this.prisma.blog.findUnique({
      where: { id: Number(id) },
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
    await this.prisma.blog.delete({ where: { id: Number(id) } });
    return { msg: 'Deleted succesfully' };
  }
}
