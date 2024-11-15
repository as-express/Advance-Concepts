import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryServer;
    constructor(categoryServer: CategoryService);
    createCategory(dto: categoryDto): Promise<import("./model/category.model").Category>;
    getCategories(): Promise<import("./model/category.model").Category[]>;
    getCategory(id: string): Promise<import("./model/category.model").Category>;
    updateCategory(id: string, dto: categoryDto): Promise<import("mongoose").Document<unknown, {}, import("./model/category.model").Category> & import("./model/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(id: string): Promise<boolean>;
}
