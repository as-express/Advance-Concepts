import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { categoryDto } from './dto/category.dto';
export declare class CategoryService {
    private readonly category;
    constructor(category: Repository<Category>);
    createCategory(dto: categoryDto): Promise<Category>;
    getCategories(): Promise<Category[]>;
    getCategory(id: number): Promise<Category>;
    updateCategory(id: number, dto: categoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(id: number): Promise<boolean>;
}
