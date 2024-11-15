import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './model/statistic.model';
import { House, houseSchema } from 'src/house/model/house.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
      { name: House.name, schema: houseSchema },
    ]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
