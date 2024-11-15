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
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseSchema = exports.House = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var State;
(function (State) {
    State["PERFECT"] = "perfect";
    State["GOOD"] = "good";
    State["NEED_REPAIR"] = "need_repair";
})(State || (State = {}));
let House = class House {
};
exports.House = House;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], House.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], House.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], House.prototype, "totalRooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], House.prototype, "bathroom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], House.prototype, "livingRoom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], House.prototype, "garage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: State, default: State.GOOD }),
    __metadata("design:type", String)
], House.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    }),
    __metadata("design:type", Object)
], House.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], House.prototype, "square", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], House.prototype, "price", void 0);
exports.House = House = __decorate([
    (0, mongoose_1.Schema)()
], House);
exports.houseSchema = mongoose_1.SchemaFactory.createForClass(House);
exports.houseSchema.index({ location: '2dsphere' });
//# sourceMappingURL=house.model.js.map