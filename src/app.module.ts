import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkdaysModule } from './workdays/workdays.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './audit-logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { WorkDay } from './entities/workday.entity';
import { User } from './entities/user.entity';
import { Log } from './entities/log.entity';

@Module({
  imports: [
    // .env dosyasını otomatik yükler; tüm modüllerde erişilebilir
    ConfigModule.forRoot({ isGlobal: true }),

    // Veritabanı bağlantısı – ConfigService ile ortam değişkenlerinden okunur.
    // synchronize: false → production'da şema değişikliklerini siz yönetirsiniz.
    // Migration kullanmak için: `typeorm migration:run` komutunu kullanın.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [WorkDay, User, Log],
        synchronize: false, // ⚠️ Production için kesinlikle false olmalı
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    AuthModule,
    UsersModule,
    WorkdaysModule,
    LogsModule,
  ],
})
export class AppModule {}
