import { OnModuleInit } from '@nestjs/common';
import { Car } from 'src/database/entities/car.entity';
import { Statistic } from 'src/database/entities/statistic.entity';
import { Repository } from 'typeorm';
export declare class StatisticService implements OnModuleInit {
    private readonly statistic;
    private readonly car;
    constructor(statistic: Repository<Statistic>, car: Repository<Car>);
    onModuleInit(): void;
    createStatistic(): Promise<void>;
    get(): Promise<Statistic>;
}
