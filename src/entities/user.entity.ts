import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Otomatik artan ID (1, 2, 3...)
  id: number;

  @Column()
  name: string; // Ad Soyad

  @Column()
  username: string; // Kullanıcı Adı (V41'deki 'user' değişkeni)

  @Column()
  password: string; // Şifre

  @Column()
  role: string; // 'admin', 'head', 'member'

  @Column()
  unit: string; // 'Aviyonik', 'Yazılım' vb.

  @Column("simple-array", { nullable: true }) 
  managedIds: string[]; // Yetkili olduğu kişilerin ID listesi (V41'deki managedIds)
}