import { OnModuleInit } from '@nestjs/common';
import { Statistic } from './model/statistic.model';
import { Model } from 'mongoose';
import { House } from 'src/house/model/house.model';
export declare class StatisticService implements OnModuleInit {
    private readonly statistic;
    private readonly house;
    constructor(statistic: Model<Statistic>, house: Model<House>);
    onModuleInit(): Promise<void>;
    get(): Promise<{
        category: import("mongoose").Document<unknown, {}, Statistic> & Statistic & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        stateStats: any;
    }>;
}
