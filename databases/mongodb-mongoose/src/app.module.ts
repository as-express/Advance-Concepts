import { Module } from '@nestjs/common';
import { HouseModule } from './house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModel } from './category/category.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    HouseModule,
    CategoryModel,
    StatisticModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
