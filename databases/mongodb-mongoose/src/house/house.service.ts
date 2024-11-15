import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { House } from './model/house.model';
import { Model } from 'mongoose';
import {
  coordinateSearch,
  HouseCreateDto,
  HouseUpdateDto,
  searchTitle,
} from './dto/house.dto';
import { Category } from 'src/category/model/category.model';
import { Statistic } from 'src/statistic/model/statistic.model';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name) private house: Model<House>,
    @InjectModel(Category.name) private category: Model<Category>,
    @InjectModel(Statistic.name) private statistic: Model<Statistic>,
  ) {}

  async createHouse(dto: HouseCreateDto) {
    const session = await this.house.db.startSession();
    try {
      session.startTransaction();
      const house = new this.house(dto);
      await house.save({ session });

      const category = await this.category
        .findById(dto.categoryId)
        .session(session);
      if (!category) {
        throw new BadRequestException('Category is not defined');
      }
      const id = '67331aea3cf7d3bb8bf40912';
      const statistic = await this.statistic.findById(id).session(session);

      if (!statistic) {
        throw new Error('Statistic is not defined');
      }

      category.houseCount += 1;
      category.houses.push(house.id);
      await category.save({ session });

      statistic.houses += 1;
      await statistic.save({ session });

      await session.commitTransaction();
      return house;
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      throw new InternalServerErrorException('Server error');
    } finally {
      session.endSession();
    }
  }

  async searchHouse(title: string): Promise<House[]> {
    try {
      const house = await this.house
        .find({
          title: { $regex: new RegExp(title, 'i') },
        })
        .exec();
      return house;
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async houseCoordinate(dto: coordinateSearch) {
    try {
      const houses = await this.house.find({
        location: {
          $geoWithin: {
            $centerSphere: [[dto.x, dto.y], dto.radius / 3963.2],
          },
        },
      });
      const housesInRadius = await this.house.aggregate([
        {
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [[dto.x, dto.y], dto.radius / 3963.2],
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            averagePrice: { $avg: '$price' },
          },
        },
      ]);
      const averagePrice = housesInRadius[0]
        ? housesInRadius[0].averagePrice
        : null;

      return {
        houses,
        averagePrice,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getHouses(
    minPrice: number,
    maxPrice: number,
    state: string,
  ): Promise<House[]> {
    try {
      const query: any = {};

      if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice !== undefined) {
        query.price = { $gte: minPrice };
      } else if (maxPrice !== undefined) {
        query.price = { $lte: maxPrice };
      }

      if (state) {
        query.state = state;
      }

      const houses = await this.house.find(query).exec();
      return houses;
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async getHouse(id: string): Promise<House> {
    try {
      const house = await this.house.findById(id);
      if (!house) {
        throw new BadRequestException('House is not defined');
      }

      return house;
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async updateHouse(id: string, dto: HouseUpdateDto) {
    try {
      await this.getHouse(id);
      const house = await this.house.findByIdAndUpdate(id, dto);
      return {
        message: 'Updated successful',
        data: house,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async deleteHouse(id: string) {
    try {
      await this.getHouse(id);
      await this.house.findByIdAndDelete(id);
      return 'House is deleted success';
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }
}
