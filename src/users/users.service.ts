import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.usersRepository.count();
    if (count === 0) {
      console.log('--- V41 VERİLERİ YÜKLENİYOR (KULLANICILAR) ---');
      // Varsayılan şifreyi bcrypt ile şifreliyoruz
      const hashedPassword = await bcrypt.hash('123', 10);
      await this.usersRepository.save([
        { 
          name: "Hüseyin Kaptan", 
          username: "kaptan", 
          password: hashedPassword, 
          role: "admin", 
          unit: "Yönetim", 
          managedIds: [] 
        },
        { 
          name: "Mehmet (Av. Bşk)", 
          username: "aviyonik", 
          password: hashedPassword, 
          role: "head", 
          unit: "Aviyonik", 
          managedIds: [] 
        }
      ]);
    }
  }

  findAll() { return this.usersRepository.find(); }
  findOne(id: number) { return this.usersRepository.findOneBy({ id }); }
  findByUsername(username: string) { return this.usersRepository.findOne({ where: { username } }); }

  async create(body: any) { 
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    const newUser = this.usersRepository.create(body); 
    return this.usersRepository.save(newUser); 
  }

  async update(id: number, body: any) { 
    if (body.password) {
      // Eğer gelen şifre zaten bir bcrypt hash'i değilse şifrele
      if (!body.password.startsWith('$2b$')) {
        body.password = await bcrypt.hash(body.password, 10);
      }
    }
    await this.usersRepository.update(id, body); 
    return this.findOne(id); 
  }

  async remove(id: number) { await this.usersRepository.delete(id); return { deleted: true }; }

  // Güvenli Login (Giriş) Fonksiyonu
  async login(username: string, pass: string) {
    const user = await this.findByUsername(username);
    
    if (user) {
      // Veritabanındaki şifre ile girilen şifreyi karşılaştır
      const isMatch = await bcrypt.compare(pass, user.password);
      
      // NOT: Render'daki veritabanında eski şifreler (düz 123) kaldıysa kilitlenmemen için eklendi.
      if (isMatch || user.password === pass) { 
        if (user.password === pass) {
          // Eski düz metin şifre ile girildiyse, arka planda hemen şifreli hale çevirip güncelle
          await this.update(user.id, { password: pass });
        }
        return user; // Giriş başarılı
      }
    }
    // Giriş başarısızsa hata fırlat
    throw new UnauthorizedException('Hatalı kullanıcı adı veya şifre');
  }
}