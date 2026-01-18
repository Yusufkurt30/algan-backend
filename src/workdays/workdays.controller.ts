import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkdaysService } from './workdays.service';

@Controller('workdays')
export class WorkdaysController {
  constructor(private readonly workdaysService: WorkdaysService) {}

  @Post()
  create(@Body() body: any) {
    // Eğer gelen veri bir LİSTE (Array) ise toplu ekleme yap
    if (Array.isArray(body)) {
      return this.workdaysService.createBulk(body);
    }
    // Değilse tekli ekleme yap
    return this.workdaysService.create(body);
  }

  @Get()
  findAll() {
    return this.workdaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workdaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.workdaysService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workdaysService.remove(+id);
  }
}