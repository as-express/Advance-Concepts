import { Category } from './model/category.model';
import { Model } from 'mongoose';
import { categoryDto } from './dto/category.dto';
export declare class CategoryService {
    private category;
    constructor(category: Model<Category>);
    createCategory(dto: categoryDto): Promise<Category>;
    getCategories(): Promise<Category[]>;
    getCategory(id: string): Promise<Category>;
    updateCategory(id: string, dto: categoryDto): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(id: string): Promise<boolean>;
}
