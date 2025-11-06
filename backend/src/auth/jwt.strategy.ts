import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) { 
    super({
      jwtFromRequest: cookieExtractor, 
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
    });
  }

  async validate(payload: { sub: string; email: string; role: Role }) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}