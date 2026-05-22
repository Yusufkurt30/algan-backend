import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  create(createLogDto: CreateLogDto) {
    const newLog = this.logRepository.create(createLogDto);
    return this.logRepository.save(newLog);
  }

  findAll() {
    return this.logRepository.find();
  }

  findOne(id: number) {
    return this.logRepository.findOneBy({ id });
  }

  async update(id: number, updateLogDto: UpdateLogDto) {
    await this.logRepository.update(id, updateLogDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.logRepository.delete(id);
    return { deleted: true };
  }
}
