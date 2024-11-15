declare enum State {
    PERFECT = "perfect",
    GOOD = "good",
    NEED_REPAIR = "need_repair"
}
export declare class House {
    title: string;
    image: string[];
    totalRooms: number;
    bathroom: number;
    livingRoom: number;
    garage: boolean;
    state: State;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    square: number;
    price: number;
}
export declare const houseSchema: import("mongoose").Schema<House, import("mongoose").Model<House, any, any, any, import("mongoose").Document<unknown, any, House> & House & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, House, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<House>> & import("mongoose").FlatRecord<House> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
