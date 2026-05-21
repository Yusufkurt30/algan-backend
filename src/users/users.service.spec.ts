import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// ──────────────────────────────────────────────────────────────────────────
// Mock Repository Factory
// Gerçek bir veritabanına bağlanmadan service mantığını test eder.
// ──────────────────────────────────────────────────────────────────────────
const mockUser: User = {
  id: 1,
  name: 'Test Kullanıcı',
  username: 'testuser',
  password: '$2b$12$hashedpasswordvalue',
  role: 'member',
  unit: 'Aviyonik',
  managedIds: [],
};

const mockRepository = {
  count: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Her testten önce mock'ları sıfırla
    jest.clearAllMocks();
  });

  // ──────────────────────────────────────────────────────────────────
  // TEST 1: Şifre hashleme
  // Kullanıcı oluşturulurken plaintext şifre asla kaydedilmemelidir.
  // ──────────────────────────────────────────────────────────────────
  describe('create()', () => {
    it('şifreyi bcrypt ile hashlemiş olarak kaydetmeli, plaintext olarak KAYDETMEMELI', async () => {
      const dto: CreateUserDto = {
        name: 'Yeni Kullanıcı',
        username: 'yeniuser',
        password: 'plaintext123',
        role: 'member',
        unit: 'Yazılım',
        managedIds: [],
      };

      // findOne → kullanıcı yok (çakışma yok)
      mockRepository.findOne.mockResolvedValue(null);

      // create + save
      const savedUser = { ...mockUser, username: 'yeniuser' };
      mockRepository.create.mockReturnValue(savedUser);
      mockRepository.save.mockResolvedValue(savedUser);

      await service.create(dto);

      // save'e giden argümanın password alanını kontrol et
      const savedArg = mockRepository.create.mock.calls[0][0] as User;
      const storedPassword: string = savedArg.password;

      // Plaintext şifre hiçbir zaman kaydedilmemeli
      expect(storedPassword).not.toBe('plaintext123');

      // bcrypt hash formatında olmalı ($2b$ ile başlar)
      expect(storedPassword).toMatch(/^\$2b\$/);

      // Hash orijinal şifreyle karşılaştırıldığında eşleşmeli
      const isValid = await bcrypt.compare('plaintext123', storedPassword);
      expect(isValid).toBe(true);
    });

    it('aynı kullanıcı adı varsa ConflictException fırlatmalı', async () => {
      const dto: CreateUserDto = {
        name: 'Kopya',
        username: 'testuser', // Zaten var
        password: 'password123',
        role: 'member',
        unit: 'Aviyonik',
        managedIds: [],
      };

      // findOne → kullanıcı zaten mevcut
      mockRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  // ──────────────────────────────────────────────────────────────────
  // TEST 2: findAll – password alanı response'da yer almamalı
  // ──────────────────────────────────────────────────────────────────
  describe('findAll()', () => {
    it('dönen kullanıcı listesinde password alanı bulunmamalı', async () => {
      mockRepository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).not.toHaveProperty('password');
      expect(result[0]).toHaveProperty('id', 1);
      expect(result[0]).toHaveProperty('username', 'testuser');
    });
  });

  // ──────────────────────────────────────────────────────────────────
  // TEST 3: findOne – bulunamayan kullanıcı için NotFoundException
  // ──────────────────────────────────────────────────────────────────
  describe('findOne()', () => {
    it('var olan kullanıcıyı password olmadan döndürmeli', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).not.toHaveProperty('password');
      expect(result.id).toBe(1);
    });

    it('bulunamayan kullanıcı için NotFoundException fırlatmalı', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
