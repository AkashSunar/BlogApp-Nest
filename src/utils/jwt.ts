import * as Jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  generateJwt(payload: any) {
    return Jwt.sign({ data: payload }, process.env.ACCESS_TOKEN_SECRET || '', {
      expiresIn: '10m',
    });
  }
}
