import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; // "2026-01-18" gibi

  @Column()
  description: string; // "Ara Tatil 1. Gün" gibi
}
