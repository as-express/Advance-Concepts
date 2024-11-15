import { IsNotEmpty } from 'class-validator';

export class carDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  mark: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  horses: number;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  long: number;

  @IsNotEmpty()
  categoryId: number;
}

export class carLocationDto {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  long: number;
}
