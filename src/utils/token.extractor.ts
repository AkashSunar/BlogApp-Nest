import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TokenExtractor {
  extractToken(request: Request): string | null {
    const authorizationHeder = request.headers['authorization'];
    if (authorizationHeder && typeof authorizationHeder === 'string') {
      const [bearer, token] = authorizationHeder.split(' ');
      if (bearer === 'Bearer' && token) {
        return token;
      }
    }
    return null;
  }
}
