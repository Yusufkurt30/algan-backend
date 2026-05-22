import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { AnalyzeLogsDto } from './dto/analyze-logs.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze')
  async analyzeLogs(@Body() analyzeLogsDto: AnalyzeLogsDto) {
    // Frontend'den (React) gelen ham yoklama verilerini alıp servisimize gönderiyoruz
    const analysisReport = await this.aiService.analyzePerformance(
      analyzeLogsDto.logData,
    );

    // Sonucu başarılı bir şekilde arayüze geri döndürüyoruz
    return {
      success: true,
      report: analysisReport,
    };
  }
}
