import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/database/entities/car.entity';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticService implements OnModuleInit {
  constructor(
    @InjectRepository(Statistic)
    private readonly statistic: Repository<Statistic>,
    @InjectRepository(Car)
    private readonly car: Repository<Car>,
  ) {}

  onModuleInit() {
    this.createStatistic();
  }

  async createStatistic() {
    try {
      const statistic = await this.statistic.find();
      if (statistic.length > 0) {
        console.log('Statistic have in database');
        return;
      }
      const newS = this.statistic.create({});
      await this.statistic.save(newS);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async get() {
    try {
      const id = 1;
      const statistic = await this.statistic.findOneBy({ id });

      const result = await this.car
        .createQueryBuilder('car')
        .select('MIN(car.price)', 'minPrice')
        .addSelect('MAX(car.price)', 'maxPrice')
        .addSelect('AVG(car.price)', 'avgPrice')
        .getRawOne();

      statistic.minPrice = result.minPrice || 0;
      statistic.avgPrice = result.avgPrice | 0;
      statistic.maxPrice = result.maxPrice || 0;
      await this.statistic.save(statistic);

      return statistic;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }
}
