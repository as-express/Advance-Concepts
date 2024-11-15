import { StatisticService } from './statistic.service';
export declare class StatisticController {
    private readonly statisticService;
    constructor(statisticService: StatisticService);
    getStatistic(): Promise<{
        category: import("mongoose").Document<unknown, {}, import("./model/statistic.model").Statistic> & import("./model/statistic.model").Statistic & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        stateStats: any;
    }>;
}
