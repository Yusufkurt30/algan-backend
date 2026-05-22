export class CreateLogDto {
  userId!: number;
  date!: string;
  status!: string;
  timeIn?: string;
  timeOut?: string;
}
