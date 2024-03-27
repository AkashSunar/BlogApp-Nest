import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { BcryptPassword } from 'src/utils/bcrypt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { OtpService } from 'src/utils/otp';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService, BcryptPassword, UsersService,OtpService],
  imports: [PrismaModule],
})
export class AuthsModule {}
