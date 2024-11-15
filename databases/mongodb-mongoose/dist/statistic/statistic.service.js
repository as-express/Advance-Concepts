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
exports.StatisticService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const statistic_model_1 = require("./model/statistic.model");
const mongoose_2 = require("mongoose");
const fs = require("fs");
const path = require("path");
const house_model_1 = require("../house/model/house.model");
let StatisticService = class StatisticService {
    constructor(statistic, house) {
        this.statistic = statistic;
        this.house = house;
    }
    async onModuleInit() {
        try {
            const isStatistic = await this.statistic.find();
            if (isStatistic.length > 0) {
                console.log('Statistic have in databases');
                return;
            }
            const statistic = await this.statistic.create({});
            await statistic.save();
            const filePath = path.join(__dirname, '../common/config/statistic.config.ts');
            fs.appendFileSync(filePath, `export const statisticId = '${statistic._id}';\n`);
            console.log('Statistic Created');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async get() {
        const result = await this.house.aggregate([
            {
                $facet: {
                    prices: [
                        {
                            $group: {
                                _id: null,
                                averagePrice: { $avg: '$price' },
                                maxPrice: { $max: '$price' },
                                minPrice: { $min: '$price' },
                            },
                        },
                    ],
                    states: [
                        {
                            $group: { _id: '$state', count: { $sum: 1 } },
                        },
                    ],
                },
            },
        ]);
        const priceStats = result[0].prices[0];
        const stateStats = result[0].states;
        const prices = priceStats.length > 0
            ? priceStats[0]
            : { averagePrice: 0, maxPrice: 0, minPrice: 0 };
        const category = await this.statistic.findById('67331aea3cf7d3bb8bf40912');
        category.highPrice = prices.maxPrice;
        category.lowPrice = prices.minPrice;
        category.middlePrice = prices.averagePrice;
        await category.save();
        return {
            category,
            stateStats,
        };
    }
};
exports.StatisticService = StatisticService;
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(statistic_model_1.Statistic.name)),
    __param(1, (0, mongoose_1.InjectModel)(house_model_1.House.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map