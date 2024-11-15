import { CarService } from './car.service';
import { carDto, carLocationDto } from './dto/car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    createCar(dto: carDto): Promise<import("../database/entities/car.entity").Car>;
    getCars(page: number, max?: number, min?: number): Promise<[import("../database/entities/car.entity").Car[], number]>;
    getCarWithLocation(id: number, dto: carLocationDto): Promise<{
        car: import("../database/entities/car.entity").Car;
        destination: number;
    }>;
    updateCar(id: number, dto: string): Promise<void>;
    restoreCar(id: number): Promise<{
        message: string;
        car: import("../database/entities/car.entity").Car[];
    }>;
    deleteCar(id: number): Promise<{
        message: string;
    }>;
}
