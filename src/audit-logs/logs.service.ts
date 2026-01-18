import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  create(body: any) {
    const newLog = this.logRepository.create(body);
    return this.logRepository.save(newLog);
  }

  findAll() {
    return this.logRepository.find();
  }

  findOne(id: number) {
    return this.logRepository.findOneBy({ id });
  }

  async update(id: number, body: any) {
    await this.logRepository.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.logRepository.delete(id);
    return { deleted: true };
  }
}