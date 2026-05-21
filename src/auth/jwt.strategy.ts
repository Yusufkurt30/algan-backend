import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: number;   // user id
  username: string;
  role: string;
  unit: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      // Authorization: Bearer <token> header'ından token'ı çıkarır
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * Token doğrulandıktan sonra bu metot çalışır.
   * Return değeri request.user olarak inject edilir.
   */
  async validate(payload: JwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException('Geçersiz token');
    }
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      unit: payload.unit,
    };
  }
}
