import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptPassword } from 'src/utils/bcrypt';
import { Prisma } from '@prisma/client';
import { Multer } from 'multer';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptPassword,
  ) {}
  async createUser(
    signUpPayload: CreateUserDto,
  ): Promise<Prisma.UserCreateInput> {
    const { name, username, email, image } = signUpPayload;
    const passwordHash = await this.bcrypt.hashPassword(signUpPayload.password);
    // console.log()
    const newUser = {
      name,
      email,
      image,
      username,
      isActive: true,
      isArchive: false,
      isEmailVerified: true,
      passwordHash,
    };
    return await this.prisma.user.create({ data: newUser });
    // return 'This action adds a new user';
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({});
    // return `This action returns all users`;
  }

  async getaUser(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
