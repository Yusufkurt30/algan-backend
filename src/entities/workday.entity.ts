import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  date: string; // "2026-01-18" ISO format

  @Column()
  description: string; // "Ara Tatil 1. Gün"
}
