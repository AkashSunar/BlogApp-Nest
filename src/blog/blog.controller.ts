import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
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
import { AuthGuard } from 'src/guards/auth.guard';

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
  // @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'List of blogs' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: [BlogEntity],
  })
  // @ApiResponse({ status: 200, description: 'List of all blogs' })
  findAll(@Request() req: any) {
    return this.blogService.findAll(req);
  }

  @Get(':id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Particular blog' })
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Update the particular blog' })
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete('delete-blog/:id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Delete a particular blog' })
  remove(@Param('id') blogId: number, @Request() req: any) {
    return this.blogService.remove(blogId,req);
  }
}
