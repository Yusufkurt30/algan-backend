import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { WorkdaysService } from './workdays.service';
import { WorkDay } from '../entities/workday.entity';
import { CreateWorkdayRangeDto } from './dto/create-workday.dto';

const mockRepository = {
  count: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('WorkdaysService', () => {
  let service: WorkdaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkdaysService,
        { provide: getRepositoryToken(WorkDay), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<WorkdaysService>(WorkdaysService);
    jest.clearAllMocks();
  });

  // ──────────────────────────────────────────────────────────────────
  // TEST 1: createRange – doğru sayıda gün oluşturulmalı
  // ──────────────────────────────────────────────────────────────────
  describe('createRange()', () => {
    it('başlangıç ve bitiş tarihleri dahil tüm günler için çalışma günü oluşturmalı', async () => {
      const dto: CreateWorkdayRangeDto = {
        startDate: '2026-01-01',
        endDate: '2026-01-03', // 3 gün
        description: 'Test Tatil',
      };

      // Her gün için create çağrılacak
      mockRepository.create.mockImplementation((d) => d);
      mockRepository.save.mockImplementation((entries) =>
        Promise.resolve(entries),
      );

      await service.createRange(dto);

      // 3 gün için 3 kez create çağrılmalı (01, 02, 03)
      expect(mockRepository.create).toHaveBeenCalledTimes(3);

      const calls = mockRepository.create.mock.calls.map(
        (c) => (c[0] as Partial<WorkDay>).date,
      );
      expect(calls).toEqual(['2026-01-01', '2026-01-02', '2026-01-03']);
    });

    it('tek günlük aralık için sadece bir kayıt oluşturmalı', async () => {
      const dto: CreateWorkdayRangeDto = {
        startDate: '2026-05-01',
        endDate: '2026-05-01',
        description: 'Tek Gün',
      };

      mockRepository.create.mockImplementation((d) => d);
      mockRepository.save.mockResolvedValue([]);

      await service.createRange(dto);

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  // ──────────────────────────────────────────────────────────────────
  // TEST 2: remove – var olmayan ID için NotFoundException
  // ──────────────────────────────────────────────────────────────────
  describe('remove()', () => {
    it('var olmayan çalışma günü silinmeye çalışıldığında NotFoundException fırlatmalı', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('var olan çalışma gününü silmeli ve { deleted: true } döndürmeli', async () => {
      const mockDay: WorkDay = { id: 1, date: '2026-01-01', description: 'Test' };
      mockRepository.findOneBy.mockResolvedValue(mockDay);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ deleted: true });
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
