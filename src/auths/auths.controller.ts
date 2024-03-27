import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateAuthDto, UserVerifyDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';

@Controller('auths')
@ApiTags('Auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: 'User Sign up' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: [UserEntity],
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/auth-image',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async signUp(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
    @Request() req: any,
  ) {
    if (file) {
      const imageName = Date.now() + '-' + file.originalname;
      createUserDto.image = imageName;
    }
    // const signedUpUser=await this.authsService.create()
    return this.authsService.create(createUserDto);
  }

  @Post('verifyUser')
  @ApiOperation({ summary: 'User verify' })
  @ApiResponse({
    status: 200,
    description: 'verification of user',
    type: [AuthEntity],
  })
  async verify(@Body() createAuthDto: UserVerifyDto, @Request() req: any) {
    return this.authsService.verifyUser(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'Login of user',
    type: [AuthEntity],
  })
  async login(@Body() loginAuthDto: CreateAuthDto, @Request() req: any) {
    console.log(loginAuthDto);
    return this.authsService.login(loginAuthDto);
  }

  @Get()
  findAll() {
    return this.authsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authsService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }
}
