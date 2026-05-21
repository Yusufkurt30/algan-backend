import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Canlıdaki Vercel sitesine ve yerel test ortamına (localhost) izin veriyoruz
  app.enableCors({
    origin: ['https://algan-frontend.vercel.app', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }); 
  
  // Dağıtım platformlarında (Render vb.) port dinamik atandığı için process.env.PORT kontrolü ekliyoruz
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();