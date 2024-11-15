"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const house_model_1 = require("./model/house.model");
const mongoose_2 = require("mongoose");
const category_model_1 = require("../category/model/category.model");
const statistic_model_1 = require("../statistic/model/statistic.model");
let HouseService = class HouseService {
    constructor(house, category, statistic) {
        this.house = house;
        this.category = category;
        this.statistic = statistic;
    }
    async createHouse(dto) {
        const session = await this.house.db.startSession();
        try {
            session.startTransaction();
            const house = new this.house(dto);
            await house.save({ session });
            const category = await this.category
                .findById(dto.categoryId)
                .session(session);
            if (!category) {
                throw new common_1.BadRequestException('Category is not defined');
            }
            const id = '67331aea3cf7d3bb8bf40912';
            const statistic = await this.statistic.findById(id).session(session);
            if (!statistic) {
                throw new Error('Statistic is not defined');
            }
            category.houseCount += 1;
            category.houses.push(house.id);
            await category.save({ session });
            statistic.houses += 1;
            await statistic.save({ session });
            await session.commitTransaction();
            return house;
        }
        catch (error) {
            await session.abortTransaction();
            console.log(error);
            throw new common_1.InternalServerErrorException('Server error');
        }
        finally {
            session.endSession();
        }
    }
    async searchHouse(title) {
        try {
            const house = await this.house
                .find({
                title: { $regex: new RegExp(title, 'i') },
            })
                .exec();
            return house;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error');
        }
    }
    async houseCoordinate(dto) {
        try {
            const houses = await this.house.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [[dto.x, dto.y], dto.radius / 3963.2],
                    },
                },
            });
            const housesInRadius = await this.house.aggregate([
                {
                    $match: {
                        location: {
                            $geoWithin: {
                                $centerSphere: [[dto.x, dto.y], dto.radius / 3963.2],
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        averagePrice: { $avg: '$price' },
                    },
                },
            ]);
            const averagePrice = housesInRadius[0]
                ? housesInRadius[0].averagePrice
                : null;
            return {
                houses,
                averagePrice,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async getHouses(minPrice, maxPrice, state) {
        try {
            const query = {};
            if (minPrice !== undefined && maxPrice !== undefined) {
                query.price = { $gte: minPrice, $lte: maxPrice };
            }
            else if (minPrice !== undefined) {
                query.price = { $gte: minPrice };
            }
            else if (maxPrice !== undefined) {
                query.price = { $lte: maxPrice };
            }
            if (state) {
                query.state = state;
            }
            const houses = await this.house.find(query).exec();
            return houses;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error');
        }
    }
    async getHouse(id) {
        try {
            const house = await this.house.findById(id);
            if (!house) {
                throw new common_1.BadRequestException('House is not defined');
            }
            return house;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error');
        }
    }
    async updateHouse(id, dto) {
        try {
            await this.getHouse(id);
            const house = await this.house.findByIdAndUpdate(id, dto);
            return {
                message: 'Updated successful',
                data: house,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error');
        }
    }
    async deleteHouse(id) {
        try {
            await this.getHouse(id);
            await this.house.findByIdAndDelete(id);
            return 'House is deleted success';
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server error');
        }
    }
};
exports.HouseService = HouseService;
exports.HouseService = HouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(house_model_1.House.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_model_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(statistic_model_1.Statistic.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], HouseService);
//# sourceMappingURL=house.service.js.map