import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkDay } from '../entities/workday.entity';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';

@Injectable()
export class WorkdaysService implements OnModuleInit {
  constructor(
    @InjectRepository(WorkDay)
    private workDayRepository: Repository<WorkDay>,
  ) {}

  async onModuleInit() {
    const count = await this.workDayRepository.count();
    if (count === 0) {
      console.log('--- BAŞLANGIÇ VERİLERİ YÜKLENİYOR ---');
      await this.workDayRepository.save([
        { date: '2026-01-15', description: '1. Gün' },
        { date: '2026-01-17', description: '2. Gün' },
        { date: '2026-01-20', description: '3. Gün' },
      ]);
    }
  }

  // Tekli Kayıt veya Toplu Kayıt
  create(dto: CreateWorkdayDto | CreateWorkdayDto[]) {
    if (Array.isArray(dto)) {
      const newWDs = this.workDayRepository.create(dto);
      return this.workDayRepository.save(newWDs);
    }
    const newWD = this.workDayRepository.create(dto);
    return this.workDayRepository.save(newWD);
  }

  findAll() {
    return this.workDayRepository.find();
  }
  findOne(id: number) {
    return this.workDayRepository.findOneBy({ id });
  }
  async update(id: number, updateWorkdayDto: UpdateWorkdayDto) {
    await this.workDayRepository.update(id, updateWorkdayDto);
    return this.findOne(id);
  }
  async remove(id: number) {
    await this.workDayRepository.delete(id);
    return { deleted: true };
  }
}
