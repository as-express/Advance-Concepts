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
const typeorm_1 = require("@nestjs/typeorm");
const car_entity_1 = require("../database/entities/car.entity");
const statistic_entity_1 = require("../database/entities/statistic.entity");
const typeorm_2 = require("typeorm");
let StatisticService = class StatisticService {
    constructor(statistic, car) {
        this.statistic = statistic;
        this.car = car;
    }
    onModuleInit() {
        this.createStatistic();
    }
    async createStatistic() {
        try {
            const statistic = await this.statistic.find();
            if (statistic.length > 0) {
                console.log('Statistic have in database');
                return;
            }
            const newS = this.statistic.create({});
            await this.statistic.save(newS);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async get() {
        try {
            const id = 1;
            const statistic = await this.statistic.findOneBy({ id });
            const result = await this.car
                .createQueryBuilder('car')
                .select('MIN(car.price)', 'minPrice')
                .addSelect('MAX(car.price)', 'maxPrice')
                .addSelect('AVG(car.price)', 'avgPrice')
                .getRawOne();
            statistic.minPrice = result.minPrice || 0;
            statistic.avgPrice = result.avgPrice | 0;
            statistic.maxPrice = result.maxPrice || 0;
            await this.statistic.save(statistic);
            return statistic;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
};
exports.StatisticService = StatisticService;
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(statistic_entity_1.Statistic)),
    __param(1, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map