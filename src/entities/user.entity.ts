import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  unit: string; // 'Yönetim', 'Aviyonik' vb.

  @Column()
  role: string; // 'admin', 'head', 'member'

  // --- İŞTE EKSİK OLAN PARÇA BU ---
  @Column("simple-array", { nullable: true })
  managedIds: string[]; // Yetki verilen kişilerin ID'leri burada tutulacak
}