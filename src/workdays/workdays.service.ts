import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkDay } from '../entities/workday.entity';

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
        { date: "2026-01-15", description: "1. Gün" },
        { date: "2026-01-17", description: "2. Gün" },
        { date: "2026-01-20", description: "3. Gün" }
      ]);
    }
  }

  // Tekli Kayıt
  create(body: any) { 
    const newWD = this.workDayRepository.create(body); 
    return this.workDayRepository.save(newWD); 
  }

  // --- TOPLU KAYIT (Date Range İçin) ---
  createBulk(body: any[]) {
    const newWDs = this.workDayRepository.create(body);
    return this.workDayRepository.save(newWDs);
  }

  findAll() { return this.workDayRepository.find(); }
  findOne(id: number) { return this.workDayRepository.findOneBy({ id }); }
  async update(id: number, body: any) { await this.workDayRepository.update(id, body); return this.findOne(id); }
  async remove(id: number) { await this.workDayRepository.delete(id); return { deleted: true }; }
}