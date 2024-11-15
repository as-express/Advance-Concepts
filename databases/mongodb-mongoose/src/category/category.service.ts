import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './model/category.model';
import { Model } from 'mongoose';
import { categoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private category: Model<Category>) {}

  async createCategory(dto: categoryDto): Promise<Category> {
    try {
      const isOldOne = await this.category.findOne({ title: dto.title });
      if (isOldOne) {
        throw new BadRequestException('Category already exist');
      }

      const category = await this.category.create(dto);
      return category;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.category.find().populate('houses').exec();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getCategory(id: string): Promise<Category> {
    try {
      const category = await this.category.findById(id);
      if (!category) {
        throw new BadRequestException('Category is not defined');
      }

      return category;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async updateCategory(id: string, dto: categoryDto) {
    try {
      const updatedCategory = await this.category
        .findByIdAndUpdate(id, dto)
        .exec();

      return updatedCategory;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async deleteCategory(id: string) {
    try {
      await this.category.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
}
