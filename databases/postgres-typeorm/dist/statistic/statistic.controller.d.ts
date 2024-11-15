import { StatisticService } from './statistic.service';
export declare class StatisticController {
    private readonly statisticService;
    constructor(statisticService: StatisticService);
    getStatistic(): Promise<import("../database/entities/statistic.entity").Statistic>;
}
