import { Car } from 'src/database/entities/car.entity';
import { Repository } from 'typeorm';
import { carDto, carLocationDto } from './dto/car.dto';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Category } from 'src/database/entities/category.entity';
export declare class CarService {
    private readonly car;
    private readonly statistic;
    private readonly category;
    constructor(car: Repository<Car>, statistic: Repository<Statistic>, category: Repository<Category>);
    createCar(dto: carDto): Promise<Car>;
    getCars(page: number, min?: number, max?: number): Promise<[Car[], number]>;
    getCar(id: number, dto: carLocationDto): Promise<{
        car: Car;
        destination: number;
    }>;
    deleteCar(id: number): Promise<{
        message: string;
    }>;
    restoreCar(id: number): Promise<{
        message: string;
        car: Car[];
    }>;
    private calculateDistance;
}
