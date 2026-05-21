import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Kullanıcı adı boş olamaz' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @MinLength(3, { message: 'Şifre en az 3 karakter olmalıdır' })
  password: string;
}
