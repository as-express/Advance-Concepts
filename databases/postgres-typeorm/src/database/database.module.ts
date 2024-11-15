import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Category } from './entities/category.entity';
import { Statistic } from './entities/statistic.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'as-express',
      password: '1234',
      database: 'user',
      entities: [Statistic, Category, Car],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
