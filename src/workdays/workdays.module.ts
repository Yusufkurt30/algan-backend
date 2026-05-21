import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkdaysService } from './workdays.service';
import { WorkdaysController } from './workdays.controller';
import { WorkDay } from '../entities/workday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkDay])],
  controllers: [WorkdaysController],
  providers: [WorkdaysService],
})
export class WorkdaysModule {}
