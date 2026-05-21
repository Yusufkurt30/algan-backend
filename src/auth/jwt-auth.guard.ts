import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard
 *
 * Bir controller metodu veya tüm controller'a uygulanan guard.
 * Geçersiz veya eksik token'da 401 Unauthorized döner.
 *
 * Kullanım:
 *   @UseGuards(JwtAuthGuard)
 *   @Get('protected-route')
 *   getData(@Request() req) { return req.user; }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
