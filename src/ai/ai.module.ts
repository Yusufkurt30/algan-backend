import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService], // İleride başka modüllerde kullanmak gerekirse diye dışa aktarıyoruz
})
export class AiModule {}
