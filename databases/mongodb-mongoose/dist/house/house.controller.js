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
exports.HouseController = void 0;
const common_1 = require("@nestjs/common");
const house_service_1 = require("./house.service");
const house_dto_1 = require("./dto/house.dto");
let HouseController = class HouseController {
    constructor(houseService) {
        this.houseService = houseService;
    }
    async createHouse(dto) {
        return this.houseService.createHouse(dto);
    }
    async searchHouse(title) {
        return this.houseService.searchHouse(title);
    }
    async coordinateFind(dto) {
        return this.houseService.houseCoordinate(dto);
    }
    async getHouses(minPrice, maxPrice, state, totalRoom, bathroom, garage, square) {
        return this.houseService.getHouses(minPrice, maxPrice, state);
    }
    async getHouse(id) {
        return this.houseService.getHouse(id);
    }
    async updateHouse(id, dto) {
        return this.houseService.updateHouse(id, dto);
    }
    async deleteHouse(id) {
        return this.houseService.deleteHouse(id);
    }
};
exports.HouseController = HouseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [house_dto_1.HouseCreateDto]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "createHouse", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "searchHouse", null);
__decorate([
    (0, common_1.Get)('location'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [house_dto_1.coordinateSearch]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "coordinateFind", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('min')),
    __param(1, (0, common_1.Query)('max')),
    __param(2, (0, common_1.Query)('state')),
    __param(3, (0, common_1.Query)('totalRoom')),
    __param(4, (0, common_1.Query)('bathroom')),
    __param(5, (0, common_1.Query)('garage')),
    __param(6, (0, common_1.Query)('square')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, Number, Boolean, Number]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "getHouses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "getHouse", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, house_dto_1.HouseUpdateDto]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "updateHouse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HouseController.prototype, "deleteHouse", null);
exports.HouseController = HouseController = __decorate([
    (0, common_1.Controller)('house'),
    __metadata("design:paramtypes", [house_service_1.HouseService])
], HouseController);
//# sourceMappingURL=house.controller.js.map