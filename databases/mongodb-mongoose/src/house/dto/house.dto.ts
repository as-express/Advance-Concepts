import {
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

export class HouseCreateDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  image: string[];

  @IsNumber()
  totalRooms: number;

  @IsNumber()
  bathroom: number;

  @IsNumber()
  livingRoom: number;

  @IsBoolean()
  garage: boolean;

  @IsNotEmpty()
  state: string;

  @IsNumber()
  square: number;

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsNumber({}, { each: true })
  // coordinates: [number, number];

  @IsNumber()
  price: number;

  @IsNotEmpty()
  categoryId: string;
}

export class HouseUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  image: string[];

  @IsOptional()
  @IsNumber()
  totalRooms: number;

  @IsOptional()
  @IsNumber()
  bathroom: number;

  @IsOptional()
  @IsNumber()
  livingRoom: number;

  @IsOptional()
  @IsBoolean()
  garage: boolean;

  @IsOptional()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsNumber()
  square: number;

  @IsOptional()
  @IsNumber()
  price: number;
}

export class searchTitle {
  @IsNotEmpty()
  title: string;
}

export class coordinateSearch {
  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;

  @IsNotEmpty()
  radius: number;
}
