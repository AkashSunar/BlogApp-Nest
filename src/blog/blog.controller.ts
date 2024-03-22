import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BlogEntity } from './entities/blog.entity';

@Controller('blogs')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiCreatedResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Create a blog' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of blogs' })
  @ApiOkResponse({ type: BlogEntity, isArray: true })
  // @ApiResponse({ status: 200, description: 'List of all blogs' })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Particular blog' })
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BlogEntity })
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BlogEntity })
  @ApiOperation({ summary: 'Delete a particular blog' })
  remove(@Param('id') id: number) {
    return this.blogService.remove(id);
  }
}
