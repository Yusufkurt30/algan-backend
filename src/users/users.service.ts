import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
      await this.usersRepository.save([
        { 
          name: "Hüseyin Kaptan", 
          username: "kaptan", 
          password: "123", 
          role: "admin", 
          unit: "Yönetim", 
          managedIds: [] 
        },
        { 
          name: "Mehmet (Av. Bşk)", 
          username: "aviyonik", 
          password: "123", 
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
  create(body: any) { const newUser = this.usersRepository.create(body); return this.usersRepository.save(newUser); }
  async update(id: number, body: any) { await this.usersRepository.update(id, body); return this.findOne(id); }
  async remove(id: number) { await this.usersRepository.delete(id); return { deleted: true }; }
}