import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { WorkdaysModule } from './workdays/workdays.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './audit-logs/logs.module'; // Klasör adı değişti
import { WorkDay } from './entities/workday.entity';
import { User } from './entities/user.entity';
import { Log } from './entities/log.entity';

@Module({
  imports: [
    // Ortam değişkenlerini (.env) okumak için gerekli
    ConfigModule.forRoot(),
    
    // Veritabanı Bağlantısı
    TypeOrmModule.forRoot({
      type: 'postgres', // Artık PostgreSQL kullanıyoruz
      url: process.env.DATABASE_URL, // Render'ın bize vereceği linki buraya otomatik koyacak
      entities: [WorkDay, User, Log], // Senin 3 tablon
      synchronize: true, // Tabloları otomatik oluşturur (Canlıda false olması önerilir ama şimdilik true kalsın)
      ssl: {
        rejectUnauthorized: false, // Neon veritabanına güvenli bağlanmak için şart
      },
    }),
    
    // Senin Modüllerin
    WorkdaysModule,
    UsersModule,
    LogsModule,
  ],
})
export class AppModule {}