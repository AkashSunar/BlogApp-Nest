import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Request,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @Roles(Role.Admin)
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UserEntity],
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/user-image',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async createUser(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
    @Request() req: any,
  ) {
    if (file) {
      const imageName = Date.now() + '-' + file.originalname;
      createUserDto.image = imageName;
    }
    createUserDto.created_by = req.userId;
    const createdUser = await this.usersService.createUser(createUserDto);
    return { msg: 'User created by admin', data: createdUser };
  }

  @Get('getUsers')
  async findAll() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.getaUser(+id);
    return { msg: 'user found', data: user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
