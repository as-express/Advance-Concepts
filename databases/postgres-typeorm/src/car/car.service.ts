import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/database/entities/car.entity';
import { Between, Long, Repository } from 'typeorm';
import { carDto, carLocationDto } from './dto/car.dto';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Category } from 'src/database/entities/category.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly car: Repository<Car>,
    @InjectRepository(Statistic)
    private readonly statistic: Repository<Statistic>,
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {}

  async createCar(dto: carDto) {
    const transaction = this.car.manager.connection.createQueryRunner();
    await transaction.startTransaction();
    try {
      const newC = this.car.create(dto);
      await transaction.manager.save(newC);

      const statisticU = await this.statistic.findOne({ where: { id: 1 } });
      if (!statisticU) {
        throw new BadRequestException('Statistic not found');
      }
      statisticU.carsCount += 1;
      await transaction.manager.save(statisticU);

      const category = await this.category.findOne({
        where: { id: dto.categoryId },
        relations: ['cars'],
      });

      if (!category) {
        throw new BadRequestException('Category is not defined');
      }

      category.carsCount += 1;
      category.cars.push(newC);
      await transaction.manager.save(category);

      await transaction.commitTransaction();

      return newC;
    } catch (error) {
      console.log(error);
      await transaction.rollbackTransaction();
      throw new InternalServerErrorException('Server Error');
    } finally {
      await transaction.release();
    }
  }

  async getCars(page: number, min?: number, max?: number) {
    const skip = (page - 1) * 20;
    const cars = await this.car.findAndCount({
      skip,
      take: 20,
      where: {
        price: Between(min || 0, max || 9999999),
      },
      order: {
        price: 'DESC',
      },
    });
    return cars;
  }

  async getCar(id: number, dto: carLocationDto) {
    const car = await this.car.findOneBy({ id });
    if (!car) {
      throw new BadRequestException('Car is not defined');
    }

    const destination = this.calculateDistance(
      car.lat,
      car.long,
      dto.lat,
      dto.long,
    );
    return {
      car,
      destination,
    };
  }

  async deleteCar(id: number) {
    const car = await this.car.findOneBy({ id });
    if (!car) {
      throw new NotFoundException('Car is not found');
    }

    await this.car.softRemove(car);
    return { message: 'Car soft Deleted' };
  }

  async restoreCar(id: number) {
    const car = await this.car.find({
      where: { id },
      withDeleted: true,
    });
    if (!car) {
      throw new NotFoundException('Car is not found');
    }
    await this.car.restore(id);
    return { message: 'Car restored', car: car };
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const phi1 = lat1 * (Math.PI / 180);
    const phi2 = lat2 * (Math.PI / 180);
    const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
    const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
