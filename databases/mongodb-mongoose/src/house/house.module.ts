import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { House, houseSchema } from './model/house.model';
import { Category, CategorySchema } from 'src/category/model/category.model';
import {
  Statistic,
  StatisticSchema,
} from 'src/statistic/model/statistic.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: House.name, schema: houseSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Statistic.name, schema: StatisticSchema },
    ]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
