export declare class Statistic {
    houses: number;
    highPrice: number;
    middlePrice: number;
    lowPrice: number;
}
export declare const StatisticSchema: import("mongoose").Schema<Statistic, import("mongoose").Model<Statistic, any, any, any, import("mongoose").Document<unknown, any, Statistic> & Statistic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Statistic, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Statistic>> & import("mongoose").FlatRecord<Statistic> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
