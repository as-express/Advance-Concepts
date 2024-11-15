import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Statistic } from './model/statistic.model';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { House } from 'src/house/model/house.model';

@Injectable()
export class StatisticService implements OnModuleInit {
  constructor(
    @InjectModel(Statistic.name) private readonly statistic: Model<Statistic>,
    @InjectModel(House.name) private readonly house: Model<House>,
  ) {}

  async onModuleInit() {
    try {
      const isStatistic = await this.statistic.find();
      if (isStatistic.length > 0) {
        console.log('Statistic have in databases');
        return;
      }

      const statistic = await this.statistic.create({});
      await statistic.save();

      const filePath = path.join(
        __dirname,
        '../common/config/statistic.config.ts',
      );
      fs.appendFileSync(
        filePath,
        `export const statisticId = '${statistic._id}';\n`,
      );

      console.log('Statistic Created');
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async get() {
    const result = await this.house.aggregate([
      {
        $facet: {
          prices: [
            {
              $group: {
                _id: null,
                averagePrice: { $avg: '$price' },
                maxPrice: { $max: '$price' },
                minPrice: { $min: '$price' },
              },
            },
          ],
          states: [
            {
              $group: { _id: '$state', count: { $sum: 1 } },
            },
          ],
        },
      },
    ]);
    const priceStats = result[0].prices[0];
    const stateStats = result[0].states;

    const prices =
      priceStats.length > 0
        ? priceStats[0]
        : { averagePrice: 0, maxPrice: 0, minPrice: 0 };
    const category = await this.statistic.findById('67331aea3cf7d3bb8bf40912');

    category.highPrice = prices.maxPrice;
    category.lowPrice = prices.minPrice;
    category.middlePrice = prices.averagePrice;

    await category.save();
    return {
      category,
      stateStats,
    };
  }
}
