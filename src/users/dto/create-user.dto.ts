import {
  IsString,
  IsNotEmpty,
  IsIn,
  MinLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'İsim boş olamaz' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Kullanıcı adı boş olamaz' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Aviyonik', 'Yazılım', 'Mekanik', 'Yönetim'], {
    message: 'Birim Aviyonik, Yazılım, Mekanik veya Yönetim olmalıdır',
  })
  unit: string;

  @IsString()
  @IsIn(['admin', 'head', 'member'], {
    message: "Rol 'admin', 'head' veya 'member' olmalıdır",
  })
  role: string;

  @IsArray()
  @IsOptional()
  managedIds?: string[];
}
