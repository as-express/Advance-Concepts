import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/database/entities/car.entity';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Category } from 'src/database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Statistic, Category])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
