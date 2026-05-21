import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   * Body: { username: string, password: string }
   * Returns: { access_token: string, user: { id, name, username, role, unit, managedIds } }
   *
   * Artık kullanıcı adı/şifre karşılaştırması FRONTEND'de değil,
   * burada bcrypt ile güvenli şekilde yapılır.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
