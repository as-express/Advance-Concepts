import { House } from './model/house.model';
import { Model } from 'mongoose';
import { coordinateSearch, HouseCreateDto, HouseUpdateDto } from './dto/house.dto';
import { Category } from 'src/category/model/category.model';
import { Statistic } from 'src/statistic/model/statistic.model';
export declare class HouseService {
    private house;
    private category;
    private statistic;
    constructor(house: Model<House>, category: Model<Category>, statistic: Model<Statistic>);
    createHouse(dto: HouseCreateDto): Promise<import("mongoose").Document<unknown, {}, House> & House & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    searchHouse(title: string): Promise<House[]>;
    houseCoordinate(dto: coordinateSearch): Promise<{
        houses: (import("mongoose").Document<unknown, {}, House> & House & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        averagePrice: any;
    }>;
    getHouses(minPrice: number, maxPrice: number, state: string): Promise<House[]>;
    getHouse(id: string): Promise<House>;
    updateHouse(id: string, dto: HouseUpdateDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, House> & House & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteHouse(id: string): Promise<string>;
}
