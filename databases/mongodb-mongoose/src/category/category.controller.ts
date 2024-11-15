import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryServer: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCategory(@Body() dto: categoryDto) {
    return this.categoryServer.createCategory(dto);
  }

  @Get()
  async getCategories() {
    return this.categoryServer.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoryServer.getCategory(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(@Param('id') id: string, @Body() dto: categoryDto) {
    return this.categoryServer.updateCategory(id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryServer.deleteCategory(id);
  }
}
