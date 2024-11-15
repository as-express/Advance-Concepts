"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const house_module_1 = require("./house/house.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const category_module_1 = require("./category/category.module");
const statistic_module_1 = require("./statistic/statistic.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            house_module_1.HouseModule,
            category_module_1.CategoryModel,
            statistic_module_1.StatisticModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB),
        ],
        controllers: [],
        providers: [config_1.ConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map