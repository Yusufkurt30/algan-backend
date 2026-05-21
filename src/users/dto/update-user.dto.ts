import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * PartialType, CreateUserDto'daki tüm alanları isteğe bağlı (optional) yapar.
 * Bu sayede PATCH isteğinde sadece değiştirmek istediğiniz alanları gönderebilirsiniz.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Şifre güncellemesi için ek doğrulama (opsiyonel)
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  override password?: string;

  @IsArray()
  @IsOptional()
  override managedIds?: string[];
}
