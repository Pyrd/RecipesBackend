import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from './tokenPayload.interface';
import { UserService } from '~/api/auth/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = request.headers.cookie.split(';');
          const token = cookies
            .find((e) => e.trim().startsWith('access_token'))
            .split('=');
          console.log(typeof token);
          console.log();
          return token && token.length > 1 ? token[1] : null;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    console.log(`VALIDATE: ${payload}`);
    return this.userService.findOneById(payload.userId);
  }
}
