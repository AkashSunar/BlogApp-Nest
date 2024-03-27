import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptPassword } from 'src/utils/bcrypt';
import { OtpService } from 'src/utils/otp';
import { MailService } from 'src/utils/mailer';
// import { mailer } from 'src/utils/mailer';

@Injectable()
export class AuthsService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptPassword,
    private generateOtp: OtpService,
    private sendMail: MailService,
  ) {}
  async create(signUpPayload: CreateUserDto) {
    const { name, username, email, image } = signUpPayload;
    const passwordHash = await this.bcrypt.hashPassword(signUpPayload.password);
    const newUser = {
      name,
      email,
      image,
      username,
      passwordHash,
    };
    // const generatedOTP= generateOtp()
    const generatedOTP = this.generateOtp.generateOtp();
    const authUser = { email: newUser.email, otpToken: +generatedOTP };
    await this.prisma.auth.create({
      data: authUser,
    });
    // await mailer(newUser.email, +generatedOTP);
    await this.sendMail.mailer(newUser.email,+generatedOTP)
    return this.prisma.user.create({ data: newUser });
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
