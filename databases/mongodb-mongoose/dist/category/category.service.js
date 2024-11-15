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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_model_1 = require("./model/category.model");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(category) {
        this.category = category;
    }
    async createCategory(dto) {
        try {
            const isOldOne = await this.category.findOne({ title: dto.title });
            if (isOldOne) {
                throw new common_1.BadRequestException('Category already exist');
            }
            const category = await this.category.create(dto);
            return category;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async getCategories() {
        try {
            const categories = await this.category.find().populate('houses').exec();
            return categories;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async getCategory(id) {
        try {
            const category = await this.category.findById(id);
            if (!category) {
                throw new common_1.BadRequestException('Category is not defined');
            }
            return category;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async updateCategory(id, dto) {
        try {
            const updatedCategory = await this.category
                .findByIdAndUpdate(id, dto)
                .exec();
            return updatedCategory;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async deleteCategory(id) {
        try {
            await this.category.findByIdAndDelete(id);
            return true;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_model_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map