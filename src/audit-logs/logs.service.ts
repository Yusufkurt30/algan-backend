import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  create(dto: CreateLogDto): Promise<Log> {
    const newLog = this.logRepository.create(dto);
    return this.logRepository.save(newLog);
  }

  findAll(): Promise<Log[]> {
    return this.logRepository.find();
  }

  async findOne(id: number): Promise<Log> {
    const log = await this.logRepository.findOneBy({ id });
    if (!log) throw new NotFoundException(`Log #${id} bulunamadı`);
    return log;
  }

  async update(id: number, dto: UpdateLogDto): Promise<Log> {
    await this.findOne(id); // 404 kontrolü
    await this.logRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id); // 404 kontrolü
    await this.logRepository.delete(id);
    return { deleted: true };
  }
}
