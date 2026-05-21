import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  // @Exclude() → JSON serialize edilirken bu alan response'a dahil edilmez.
  // Controller'da ClassSerializerInterceptor aktif olduğunda otomatik çalışır.
  @Exclude()
  @Column()
  password: string;

  @Column()
  unit: string; // 'Yönetim', 'Aviyonik', vb.

  @Column()
  role: string; // 'admin', 'head', 'member'

  @Column('simple-array', { nullable: true })
  managedIds: string[];
}
