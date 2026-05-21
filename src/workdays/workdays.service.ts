import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkDay } from '../entities/workday.entity';
import { CreateWorkdayDto, CreateWorkdayRangeDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';

@Injectable()
export class WorkdaysService implements OnModuleInit {
  constructor(
    @InjectRepository(WorkDay)
    private readonly workDayRepository: Repository<WorkDay>,
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.workDayRepository.count();
    if (count === 0) {
      console.log('--- BAŞLANGIÇ ÇALIŞMA GÜNLERİ YÜKLENİYOR ---');
      await this.workDayRepository.save([
        { date: '2026-01-15', description: '1. Gün' },
        { date: '2026-01-17', description: '2. Gün' },
        { date: '2026-01-20', description: '3. Gün' },
      ]);
    }
  }

  // Tekli kayıt
  create(dto: CreateWorkdayDto): Promise<WorkDay> {
    const newWorkDay = this.workDayRepository.create(dto);
    return this.workDayRepository.save(newWorkDay);
  }

  // Tarih aralığı (toplu) kayıt
  async createRange(dto: CreateWorkdayRangeDto): Promise<WorkDay[]> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    const workDays: WorkDay[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const entry = this.workDayRepository.create({
        date: dateStr,
        description: dto.description,
      });
      workDays.push(entry);
    }

    return this.workDayRepository.save(workDays);
  }

  findAll(): Promise<WorkDay[]> {
    return this.workDayRepository.find({ order: { date: 'ASC' } });
  }

  async findOne(id: number): Promise<WorkDay> {
    const workDay = await this.workDayRepository.findOneBy({ id });
    if (!workDay) throw new NotFoundException(`Çalışma günü #${id} bulunamadı`);
    return workDay;
  }

  async update(id: number, dto: UpdateWorkdayDto): Promise<WorkDay> {
    await this.findOne(id); // 404 kontrolü
    await this.workDayRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id); // 404 kontrolü
    await this.workDayRepository.delete(id);
    return { deleted: true };
  }
}
