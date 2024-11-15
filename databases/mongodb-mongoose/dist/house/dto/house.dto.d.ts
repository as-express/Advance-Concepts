export declare class HouseCreateDto {
    title: string;
    image: string[];
    totalRooms: number;
    bathroom: number;
    livingRoom: number;
    garage: boolean;
    state: string;
    square: number;
    price: number;
    categoryId: string;
}
export declare class HouseUpdateDto {
    title: string;
    image: string[];
    totalRooms: number;
    bathroom: number;
    livingRoom: number;
    garage: boolean;
    state: string;
    square: number;
    price: number;
}
export declare class searchTitle {
    title: string;
}
export declare class coordinateSearch {
    x: number;
    y: number;
    radius: number;
}
