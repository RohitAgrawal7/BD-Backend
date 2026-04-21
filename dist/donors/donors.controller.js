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
exports.DonorsController = void 0;
const common_1 = require("@nestjs/common");
const donors_service_1 = require("./donors.service");
const create_donor_dto_1 = require("./dto/create-donor.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DonorsController = class DonorsController {
    constructor(donorsService) {
        this.donorsService = donorsService;
    }
    async create(payload) {
        // Basic validation (typed keys so TS can index payload safely)
        const required = ['fullName', 'phone', 'age', 'bloodType', 'city'];
        for (const r of required) {
            if (!payload[r]) {
                throw new common_1.HttpException(`${String(r)} is required`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        return this.donorsService.create(payload);
    }
    async findAll(status, page = '1', pageSize = '10') {
        const p = parseInt(page, 10) || 1;
        const ps = parseInt(pageSize, 10) || 10;
        return this.donorsService.findAll({ status, page: p, pageSize: ps });
    }
    async stats() {
        return this.donorsService.stats();
    }
    async findOne(id) {
        const d = await this.donorsService.findOne(Number(id));
        if (!d)
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        return d;
    }
    async updateStatus(id, status) {
        if (!['accepted', 'rejected', 'pending'].includes(status)) {
            throw new common_1.HttpException('Invalid status', common_1.HttpStatus.BAD_REQUEST);
        }
        const ok = await this.donorsService.updateStatus(Number(id), status);
        if (!ok)
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        return { success: true };
    }
};
exports.DonorsController = DonorsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_donor_dto_1.CreateDonorDto]),
    __metadata("design:returntype", Promise)
], DonorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DonorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonorsController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonorsController.prototype, "updateStatus", null);
exports.DonorsController = DonorsController = __decorate([
    (0, common_1.Controller)('donors'),
    __metadata("design:paramtypes", [donors_service_1.DonorsService])
], DonorsController);
//# sourceMappingURL=donors.controller.js.map