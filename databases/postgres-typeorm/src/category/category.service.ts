import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { categoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {}

  async createCategory(dto: categoryDto) {
    try {
      const newC = this.category.create(dto);
      await this.category.save(newC);

      return newC;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getCategories() {
    try {
      const categories = await this.category.find();
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getCategory(id: number) {
    try {
      const categoryById = await this.category.findOneBy({ id });
      if (categoryById) {
        throw new BadRequestException('Category is not defined');
      }

      return categoryById;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async updateCategory(id: number, dto: categoryDto) {
    try {
      const updated = await this.category.update(id, dto);
      return updated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }

  async deleteCategory(id: number) {
    try {
      await this.category.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Server Error');
    }
  }
}
