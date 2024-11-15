"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticModule = void 0;
const common_1 = require("@nestjs/common");
const statistic_controller_1 = require("./statistic.controller");
const statistic_service_1 = require("./statistic.service");
const mongoose_1 = require("@nestjs/mongoose");
const statistic_model_1 = require("./model/statistic.model");
const house_model_1 = require("../house/model/house.model");
let StatisticModule = class StatisticModule {
};
exports.StatisticModule = StatisticModule;
exports.StatisticModule = StatisticModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: statistic_model_1.Statistic.name, schema: statistic_model_1.StatisticSchema },
                { name: house_model_1.House.name, schema: house_model_1.houseSchema },
            ]),
        ],
        controllers: [statistic_controller_1.StatisticController],
        providers: [statistic_service_1.StatisticService],
    })
], StatisticModule);
//# sourceMappingURL=statistic.module.js.map