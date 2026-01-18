import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity'; // Ana entity klasöründen çekiyoruz

@Module({
  imports: [TypeOrmModule.forFeature([User])], // User tablosunu bu modüle bağladık
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}