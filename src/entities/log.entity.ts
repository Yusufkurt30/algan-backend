import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Hangi üye?

  @Column()
  date: string; // Hangi gün?

  @Column()
  status: string; // 'present' (geldi) veya 'absent' (gelmedi)

  @Column({ nullable: true }) // Boş olabilir (henüz girmediyse)
  timeIn: string;

  @Column({ nullable: true }) // Boş olabilir (henüz çıkmadıysa)
  timeOut: string;
}
