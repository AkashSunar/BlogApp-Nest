import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptPassword } from 'utils/bcrypt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptPassword],
  imports: [PrismaModule],
})
export class UsersModule {}
