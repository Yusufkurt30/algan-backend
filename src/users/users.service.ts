import {
  Injectable,
  OnModuleInit,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // ────────────────────────────────────────────────────────────────
  // Seed: İlk kurulumda veya yusufadmin yoksa zorunlu hesap oluştur
  // ────────────────────────────────────────────────────────────────
  async onModuleInit(): Promise<void> {
    const count = await this.usersRepository.count();
    
    // 1. Durum: Veritabanı bomboşsa her şeyi kur
    if (count === 0) {
      console.log('--- BAŞLANGIÇ KULLANICILARI YÜKLENİYOR ---');
      const hashedPassword = await bcrypt.hash('123456', BCRYPT_ROUNDS);

      await this.usersRepository.save([
        {
          name: 'Hüseyin Kaptan',
          username: 'kaptan',
          password: hashedPassword,
          role: 'admin',
          unit: 'Yönetim',
          managedIds: [],
        },
        {
          name: 'Yusuf Admin',
          username: 'yusufadmin',
          password: hashedPassword,
          role: 'admin',
          unit: 'Yönetim',
          managedIds: [],
        },
      ]);
      return;
    }

    // 2. Durum: Veritabanı dolu ama yusufadmin unutulduysa ekle
    const yusufExists = await this.usersRepository.findOne({ where: { username: 'yusufadmin' } });
    if (!yusufExists) {
      console.log('--- KURTARMA HESABI (yusufadmin) EKLENİYOR ---');
      const hashedPassword = await bcrypt.hash('123456', BCRYPT_ROUNDS);
      await this.usersRepository.save({
        name: 'Yusuf Admin',
        username: 'yusufadmin',
        password: hashedPassword,
        role: 'admin',
        unit: 'Yönetim',
        managedIds: [],
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // CRUD İşlemleri
  // ────────────────────────────────────────────────────────────────

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password: _password, ...rest }) => rest as User);
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Kullanıcı #${id} bulunamadı`);
    const { password: _password, ...rest } = user;
    return rest as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.usersRepository.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('Bu kullanıcı adı zaten kullanılıyor');
    }

    const hashed = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const newUser = this.usersRepository.create({ ...dto, password: hashed });
    const saved = await this.usersRepository.save(newUser);
    const { password: _password, ...rest } = saved;
    return rest as User;
  }

  async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    await this.findOne(id);

    const updateData: Partial<User> = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    }

    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
    return { deleted: true };
  }
}