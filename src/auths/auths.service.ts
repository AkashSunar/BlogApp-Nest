import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptPassword } from 'src/utils/bcrypt';
import { OtpService } from 'src/utils/otp';
import { MailService } from 'src/utils/mailer';
import { CreateAuthDto, UserVerifyDto } from './dto/create-auth.dto';
import { JwtService } from 'src/utils/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptPassword,
    private otpService: OtpService,
    private sendMail: MailService,
    private jwtService: JwtService,
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
    const generatedOTP = this.otpService.generateOtp();
    const authUser = { email: newUser.email, otpToken: +generatedOTP };
    await this.prisma.auth.create({
      data: authUser,
    });
    // await mailer(newUser.email, +generatedOTP);
    await this.sendMail.mailer(newUser.email, +generatedOTP);
    return this.prisma.user.create({ data: newUser });
  }

  async verifyUser(userAuth: UserVerifyDto) {
    const { email, otpToken } = userAuth;
    const auth = await this.prisma.auth.findUnique({ where: { email: email } });
    if (!auth)
      throw new HttpException('User is not available', HttpStatus.BAD_REQUEST);
    const IsValidToken = this.otpService.verifyOtp(String(otpToken));
    if (!IsValidToken)
      throw new HttpException('Token is expired', HttpStatus.BAD_REQUEST);
    const emailValid = auth.otpToken === otpToken;
    if (!emailValid)
      throw new HttpException('Token is mismatched', HttpStatus.BAD_REQUEST);
    await this.prisma.user.update({
      where: { email },
      data: { isEmailVerified: true, isActive: true },
    });
    await this.prisma.auth.delete({
      where: { email },
    });
    return true;
  }

  async login(loginPayload: CreateAuthDto) {
    const { email, password } = loginPayload;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new HttpException('User is not available', HttpStatus.BAD_REQUEST);
    if (!user.isEmailVerified)
      throw new HttpException(
        'User email is not verified',
        HttpStatus.BAD_REQUEST,
      );
    if (!user.isActive)
      throw new HttpException('User is not active', HttpStatus.BAD_REQUEST);
    const passwordCorrect =
      user === null
        ? false
        : await this.bcrypt.comparePassword(password, user.passwordHash);

    if (!passwordCorrect)
      throw new HttpException(
        'Email or Password is incorrectr',
        HttpStatus.BAD_REQUEST,
      );
    const jwtPayload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.generateJwt(jwtPayload);
    return { email: user.email, accessToken };
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
