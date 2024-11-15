import mongoose from 'mongoose';
import { House } from 'src/house/model/house.model';
export declare class Category {
    title: string;
    houseCount: number;
    houses: House[];
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, mongoose.Document<unknown, any, Category> & Category & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, mongoose.FlatRecord<Category>> & mongoose.FlatRecord<Category> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
