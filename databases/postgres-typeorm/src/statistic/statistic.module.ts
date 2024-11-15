import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Car } from 'src/database/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, Car])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
