import {
  IsNumber,
  IsDateString,
  IsIn,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM formatı

export class CreateLogDto {
  @IsNumber({}, { message: 'userId sayısal bir değer olmalıdır' })
  userId: number;

  @IsDateString({}, { message: "Tarih 'YYYY-MM-DD' formatında olmalıdır" })
  date: string;

  @IsString()
  @IsIn(['present', 'absent'], {
    message: "Status 'present' veya 'absent' olmalıdır",
  })
  status: string;

  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, { message: "Giriş saati 'HH:MM' formatında olmalıdır" })
  timeIn?: string;

  @IsOptional()
  @IsString()
  @Matches(TIME_REGEX, { message: "Çıkış saati 'HH:MM' formatında olmalıdır" })
  timeOut?: string;
}
