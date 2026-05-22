import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // API anahtarını .env dosyasından çekiyoruz
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('UYARI: GEMINI_API_KEY .env dosyasında bulunamadı!');
    }
    // Gemini istemcisini başlatıyoruz
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async analyzePerformance(
    logData: Record<string, unknown> | Record<string, unknown>[],
  ): Promise<string> {
    try {
      // Hızlı ve mantıksal analizler için flash modelini kullanıyoruz
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      });

      // Dokümantasyondaki role büründürme (Prompt Engineering) şablonu
      const prompt = `
      [ROL]: Sen Algan İHA Takımı'nın kurumsal yönetim analistisin.
      [VERİ]: Son haftaya ait katılım verileri şu şekildedir: ${JSON.stringify(logData)}
      [GÖREV]: Yukarıdaki verileri inceleyerek hangi birimin performansının düştüğünü, hangi günlerde laboratuvar katılımının azaldığını tespit et ve liderlere yönetimsel tavsiyeler sun. Raporu profesyonel ve maddeler halinde markdown formatında yaz.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('AI Analiz Hatası:', error);
      throw new InternalServerErrorException(
        'Yapay zeka analizi sırasında bir hata oluştu.',
      );
    }
  }
}
