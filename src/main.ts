import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ──────────────────────────────────────────────────────────────
  // Global Validation Pipe
  // Bütün gelen request body'leri DTO class'larına göre doğrular.
  // whitelist:true → DTO'da tanımlı olmayan alanları siler (güvenlik).
  // forbidNonWhitelisted:true → bilinmeyen alan gelirse 400 fırlatır.
  // transform:true → string "1" gibi değerleri number'a çevirir (query params için).
  // ──────────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // React frontend'in bağlanmasına izin ver
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
