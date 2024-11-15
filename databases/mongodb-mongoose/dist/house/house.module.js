"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseModule = void 0;
const common_1 = require("@nestjs/common");
const house_service_1 = require("./house.service");
const house_controller_1 = require("./house.controller");
const mongoose_1 = require("@nestjs/mongoose");
const house_model_1 = require("./model/house.model");
const category_model_1 = require("../category/model/category.model");
const statistic_model_1 = require("../statistic/model/statistic.model");
let HouseModule = class HouseModule {
};
exports.HouseModule = HouseModule;
exports.HouseModule = HouseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: house_model_1.House.name, schema: house_model_1.houseSchema },
                { name: category_model_1.Category.name, schema: category_model_1.CategorySchema },
                { name: statistic_model_1.Statistic.name, schema: statistic_model_1.StatisticSchema },
            ]),
        ],
        controllers: [house_controller_1.HouseController],
        providers: [house_service_1.HouseService],
    })
], HouseModule);
//# sourceMappingURL=house.module.js.map