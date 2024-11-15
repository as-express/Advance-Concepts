import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { carDto, carLocationDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCar(@Body() dto: carDto) {
    return this.carService.createCar(dto);
  }

  @Get()
  async getCars(
    @Query('page') page: number,
    @Query('max') max?: number,
    @Query('min') min?: number,
  ) {
    return this.carService.getCars(page, min, max);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getCarWithLocation(
    @Param('id') id: number,
    @Body() dto: carLocationDto,
  ) {
    return this.carService.getCar(id, dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCar(@Param('id') id: number, @Body() dto: string) {
    // return this.carService
  }

  @Post(':id/restore')
  async restoreCar(@Param('id') id: number) {
    return this.carService.restoreCar(id);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: number) {
    return this.carService.deleteCar(id);
  }
}
