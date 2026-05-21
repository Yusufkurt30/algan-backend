import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { WorkdaysService } from './workdays.service';
import { CreateWorkdayDto, CreateWorkdayRangeDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workdays')
export class WorkdaysController {
  constructor(private readonly workdaysService: WorkdaysService) {}

  // POST /workdays  – Tekli çalışma günü ekle
  @Post()
  create(@Body() createWorkdayDto: CreateWorkdayDto) {
    return this.workdaysService.create(createWorkdayDto);
  }

  // POST /workdays/range  – Tarih aralığı ile toplu ekle
  // Not: Önceki kodda body tipi (Array vs Object) aynı endpoint'te kontrol
  // ediliyordu. Bu daha temiz: her işlem için ayrı endpoint.
  @Post('range')
  createRange(@Body() createWorkdayRangeDto: CreateWorkdayRangeDto) {
    return this.workdaysService.createRange(createWorkdayRangeDto);
  }

  // GET /workdays  – Tüm çalışma günleri (tarihe göre sıralı)
  @Get()
  findAll() {
    return this.workdaysService.findAll();
  }

  // GET /workdays/:id  – Tek çalışma günü
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workdaysService.findOne(id);
  }

  // PATCH /workdays/:id  – Güncelle
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkdayDto: UpdateWorkdayDto,
  ) {
    return this.workdaysService.update(id, updateWorkdayDto);
  }

  // DELETE /workdays/:id  – Sil
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workdaysService.remove(id);
  }
}
