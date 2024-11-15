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
import { HouseService } from './house.service';
import {
  coordinateSearch,
  HouseCreateDto,
  HouseUpdateDto,
} from './dto/house.dto';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createHouse(@Body() dto: HouseCreateDto) {
    return this.houseService.createHouse(dto);
  }

  @Get('search')
  async searchHouse(@Query('title') title: string) {
    return this.houseService.searchHouse(title);
  }

  @Get('location')
  @UsePipes(new ValidationPipe())
  async coordinateFind(@Body() dto: coordinateSearch) {
    return this.houseService.houseCoordinate(dto);
  }

  @Get()
  async getHouses(
    @Query('min') minPrice: number,
    @Query('max') maxPrice: number,
    @Query('state') state: string,
    @Query('totalRoom') totalRoom: number,
    // @Query('livingRoom') livingRoom: number,
    @Query('bathroom') bathroom: number,
    @Query('garage') garage: boolean,
    @Query('square') square: number,
  ) {
    return this.houseService.getHouses(
      minPrice,
      maxPrice,
      state,
      // totalRoom,
      // livingRoom,
      // bathroom,
      // garage,
      // square,
    );
  }

  @Get(':id')
  async getHouse(@Param('id') id: string) {
    return this.houseService.getHouse(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateHouse(@Param('id') id: string, @Body() dto: HouseUpdateDto) {
    return this.houseService.updateHouse(id, dto);
  }

  @Delete(':id')
  async deleteHouse(@Param('id') id: string) {
    return this.houseService.deleteHouse(id);
  }
}
