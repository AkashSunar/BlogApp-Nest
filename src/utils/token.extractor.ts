import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from './jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TokenExtractor {
  constructor(private jwtService: JwtService) {}
  refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  accessTokensecret = process.env.ACCESS_TOKEN_SECRET;

  extractToken(request: Request, response: Response): string | null {
    console.log(request, 'checking request');
    const authorizationHeder = request.headers['authorization'];
    if (authorizationHeder && typeof authorizationHeder === 'string') {
      const [Bearer, token] = authorizationHeder.split(' ');
      try {
        const decodedToken = this.jwtService.verifyJwt(
          token,
          this.accessTokensecret,
        );
        return token;
      } catch (error) {
        const refreshToken = request.cookies.refreshToken;
        const decodedRefreshToken = this.jwtService.verifyJwt(
          refreshToken,
          this.refreshTokenSecret,
        ) as JwtPayload;
        const payload = {
          email: decodedRefreshToken.data.email,
          id: decodedRefreshToken.data.id,
        };
        const newAccessToken = this.jwtService.generateJwt(payload);
        return newAccessToken;
      }
    }
    return null;
  }
}
