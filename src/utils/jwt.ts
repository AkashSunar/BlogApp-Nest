import * as Jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  generateJwt(payload: any) {
    return Jwt.sign({ data: payload }, process.env.ACCESS_TOKEN_SECRET || '', {
      expiresIn: '30m',
    });
  }
  refreshJwt(payload: any) {
    return Jwt.sign({ data: payload }, process.env.REFRESH_TOKEN_SECRET || '', {
      expiresIn: '1w',
    });
  }
  verifyJwt(token: any) {
    return Jwt.verify(token || '', process.env.ACCESS_TOKEN_SECRET || '');
  }
}
