import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  date: string; // "2026-01-18"

  @Column()
  status: string; // 'present' | 'absent'

  @Column({ nullable: true })
  timeIn: string;

  @Column({ nullable: true })
  timeOut: string;
}
