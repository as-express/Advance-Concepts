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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const car_entity_1 = require("../database/entities/car.entity");
const typeorm_2 = require("typeorm");
const statistic_entity_1 = require("../database/entities/statistic.entity");
const category_entity_1 = require("../database/entities/category.entity");
let CarService = class CarService {
    constructor(car, statistic, category) {
        this.car = car;
        this.statistic = statistic;
        this.category = category;
    }
    async createCar(dto) {
        const transaction = this.car.manager.connection.createQueryRunner();
        await transaction.startTransaction();
        try {
            const newC = this.car.create(dto);
            await transaction.manager.save(newC);
            const statisticU = await this.statistic.findOne({ where: { id: 1 } });
            if (!statisticU) {
                throw new common_1.BadRequestException('Statistic not found');
            }
            statisticU.carsCount += 1;
            await transaction.manager.save(statisticU);
            const category = await this.category.findOne({
                where: { id: dto.categoryId },
                relations: ['cars'],
            });
            if (!category) {
                throw new common_1.BadRequestException('Category is not defined');
            }
            category.carsCount += 1;
            category.cars.push(newC);
            await transaction.manager.save(category);
            await transaction.commitTransaction();
            return newC;
        }
        catch (error) {
            console.log(error);
            await transaction.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Server Error');
        }
        finally {
            await transaction.release();
        }
    }
    async getCars(page, min, max) {
        const skip = (page - 1) * 20;
        const cars = await this.car.findAndCount({
            skip,
            take: 20,
            where: {
                price: (0, typeorm_2.Between)(min || 0, max || 9999999),
            },
            order: {
                price: 'DESC',
            },
        });
        return cars;
    }
    async getCar(id, dto) {
        const car = await this.car.findOneBy({ id });
        if (!car) {
            throw new common_1.BadRequestException('Car is not defined');
        }
        const destination = this.calculateDistance(car.lat, car.long, dto.lat, dto.long);
        return {
            car,
            destination,
        };
    }
    async deleteCar(id) {
        const car = await this.car.findOneBy({ id });
        if (!car) {
            throw new common_1.NotFoundException('Car is not found');
        }
        await this.car.softRemove(car);
        return { message: 'Car soft Deleted' };
    }
    async restoreCar(id) {
        const car = await this.car.find({
            where: { id },
            withDeleted: true,
        });
        if (!car) {
            throw new common_1.NotFoundException('Car is not found');
        }
        await this.car.restore(id);
        return { message: 'Car restored', car: car };
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const phi1 = lat1 * (Math.PI / 180);
        const phi2 = lat2 * (Math.PI / 180);
        const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
        const deltaLambda = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) *
                Math.cos(phi2) *
                Math.sin(deltaLambda / 2) *
                Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(1, (0, typeorm_1.InjectRepository)(statistic_entity_1.Statistic)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CarService);
//# sourceMappingURL=car.service.js.map