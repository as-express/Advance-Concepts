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
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../database/entities/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(category) {
        this.category = category;
    }
    async createCategory(dto) {
        try {
            const newC = this.category.create(dto);
            await this.category.save(newC);
            return newC;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async getCategories() {
        try {
            const categories = await this.category.find();
            return categories;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async getCategory(id) {
        try {
            const categoryById = await this.category.findOneBy({ id });
            if (categoryById) {
                throw new common_1.BadRequestException('Category is not defined');
            }
            return categoryById;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async updateCategory(id, dto) {
        try {
            const updated = await this.category.update(id, dto);
            return updated;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
    async deleteCategory(id) {
        try {
            await this.category.delete(id);
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Server Error');
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map