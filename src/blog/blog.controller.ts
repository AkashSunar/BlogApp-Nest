import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { BlogEntity } from './entities/blog.entity';

@Controller('blogs')
@UseGuards(RolesGuard)
@ApiTags('Blog')
@ApiBearerAuth('access-token')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('post-blog')
  @Roles(Role.User)
  @ApiCreatedResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Create a blog' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: [BlogEntity],
  })
  create(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    createBlogDto.userId = req.userId;
    return this.blogService.create(createBlogDto);
  }

  @Get('get-blogs')
  @ApiCreatedResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'List of blogs' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: [BlogEntity],
  })
  async findAll(@Request() req: any, @Response() res: any) {
    const result = await this.blogService.findAll(req, res);
    res.status(200).json({ data: result, msg: 'All blogs' });
  }

  @Patch('update-blog/:id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Update the particular blog' })
  update(
    @Param('id') blogId: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req: any,
    @Response() res: any,
  ) {
    return this.blogService.update(blogId, updateBlogDto, req, res);
  }

  @Delete('delete-blog/:id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Delete a particular blog' })
  remove(
    @Param('id') blogId: number,
    @Request() req: any,
    @Response() res: any,
  ) {
    return this.blogService.remove(blogId, req, res);
  }
}
