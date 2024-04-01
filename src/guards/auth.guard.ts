import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestBody = context.switchToHttp().getRequest();
    const tokenArray = requestBody.headers.authorization.split(' ');
    const token = tokenArray[tokenArray.length - 1];
    console.log(token, 'checking token');
    return true;
  }
}
