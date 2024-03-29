import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptPassword } from 'src/utils/bcrypt';
import { JwtService } from 'src/utils/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptPassword, JwtService],
  imports: [PrismaModule],
})
export class UsersModule {}
