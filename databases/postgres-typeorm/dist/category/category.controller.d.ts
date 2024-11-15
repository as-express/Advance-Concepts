import { CategoryService } from './category.service';
import { categoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    categoryCreate(dto: categoryDto): Promise<import("../database/entities/category.entity").Category>;
    getCategories(): Promise<import("../database/entities/category.entity").Category[]>;
    getCategory(id: number): Promise<import("../database/entities/category.entity").Category>;
    updateCategory(id: number, dto: categoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(id: number): Promise<boolean>;
}
