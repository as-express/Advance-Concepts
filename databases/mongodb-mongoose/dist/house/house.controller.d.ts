import { HouseService } from './house.service';
import { coordinateSearch, HouseCreateDto, HouseUpdateDto } from './dto/house.dto';
export declare class HouseController {
    private readonly houseService;
    constructor(houseService: HouseService);
    createHouse(dto: HouseCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./model/house.model").House> & import("./model/house.model").House & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    searchHouse(title: string): Promise<import("./model/house.model").House[]>;
    coordinateFind(dto: coordinateSearch): Promise<{
        houses: (import("mongoose").Document<unknown, {}, import("./model/house.model").House> & import("./model/house.model").House & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        averagePrice: any;
    }>;
    getHouses(minPrice: number, maxPrice: number, state: string, totalRoom: number, bathroom: number, garage: boolean, square: number): Promise<import("./model/house.model").House[]>;
    getHouse(id: string): Promise<import("./model/house.model").House>;
    updateHouse(id: string, dto: HouseUpdateDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./model/house.model").House> & import("./model/house.model").House & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteHouse(id: string): Promise<string>;
}
