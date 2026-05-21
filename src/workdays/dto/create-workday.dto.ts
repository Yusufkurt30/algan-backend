import { IsString, IsNotEmpty, IsDateString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkdayDto {
  @IsDateString({}, { message: "Tarih 'YYYY-MM-DD' formatında olmalıdır" })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Açıklama boş olamaz' })
  description: string;
}

// Toplu ekleme için ayrı DTO
export class CreateWorkdayRangeDto {
  @IsDateString({}, { message: "Başlangıç tarihi 'YYYY-MM-DD' formatında olmalıdır" })
  startDate: string;

  @IsDateString({}, { message: "Bitiş tarihi 'YYYY-MM-DD' formatında olmalıdır" })
  endDate: string;

  @IsString()
  @IsNotEmpty({ message: 'Açıklama boş olamaz' })
  description: string;
}
