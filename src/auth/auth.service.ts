import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Kullanıcıyı doğrula ve JWT döndür.
   * Şifre kontrolü bcrypt ile yapılır – plaintext karşılaştırma YOK.
   */
  async login(dto: LoginDto): Promise<{ access_token: string; user: Omit<Express.User, 'password'> }> {
    const user = await this.usersService.findByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Hatalı kullanıcı adı veya şifre');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      // Güvenlik: var olup olmadığını sızdırmamak için aynı mesaj
      throw new UnauthorizedException('Hatalı kullanıcı adı veya şifre');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      unit: user.unit,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        unit: user.unit,
        managedIds: user.managedIds,
      },
    };
  }
}
