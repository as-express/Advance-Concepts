import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CarModule } from './car/car.module';
import { StatisticModule } from './statistic/statistic.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoryModule,
    CarModule,
    StatisticModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
