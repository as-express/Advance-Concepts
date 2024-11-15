import { Category } from './category.entity';
export declare class Car {
    id: number;
    title: string;
    mark: string;
    horses: number;
    price: number;
    lat: number;
    long: number;
    category: Category;
    categoryId: number;
    deletedAt: Date | null;
}
