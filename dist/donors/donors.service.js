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
exports.DonorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const donor_entity_1 = require("./donor.entity");
let DonorsService = class DonorsService {
    constructor(repo) {
        this.repo = repo;
    }
    normalizeInput(payload) {
        return {
            ...payload,
            status: payload?.status || 'pending',
        };
    }
    async create(payload) {
        const toSave = this.normalizeInput(payload);
        const saved = await this.repo.save(toSave);
        return saved;
    }
    async findAll(opts) {
        const qb = this.repo.createQueryBuilder('d');
        if (opts.status && opts.status !== 'all') {
            qb.where('d.status = :status', { status: opts.status });
        }
        qb.orderBy('d.id', 'DESC');
        const page = opts.page || 1;
        const pageSize = opts.pageSize || 10;
        qb.skip((page - 1) * pageSize).take(pageSize);
        const [data, total] = await qb.getManyAndCount();
        return { total, page, pageSize, data };
    }
    async findOne(id) {
        return this.repo.findOneBy({ id }) || null;
    }
    async updateStatus(id, status) {
        const res = await this.repo.update({ id }, { status });
        return res.affected && res.affected > 0;
    }
    async stats() {
        const donorList = await this.repo.find();
        const total = donorList.length;
        const byBloodType = donorList.reduce((acc, d) => {
            if (!d?.bloodType)
                return acc;
            acc[d.bloodType] = (acc[d.bloodType] || 0) + 1;
            return acc;
        }, {});
        const acceptedByBloodType = donorList.reduce((acc, d) => {
            if ((d?.status || 'pending') !== 'accepted')
                return acc;
            if (!d?.bloodType)
                return acc;
            acc[d.bloodType] = (acc[d.bloodType] || 0) + 1;
            return acc;
        }, {});
        const statusCounts = donorList.reduce((acc, d) => {
            if (d.status === 'accepted')
                acc.accepted++;
            else if (d.status === 'rejected')
                acc.rejected++;
            else
                acc.pending++;
            return acc;
        }, { accepted: 0, rejected: 0, pending: 0 });
        const male = donorList.reduce((acc, d) => (String(d.gender || '').toLowerCase() === 'male' ? acc + 1 : acc), 0);
        const female = donorList.reduce((acc, d) => (String(d.gender || '').toLowerCase() === 'female' ? acc + 1 : acc), 0);
        const acceptedMale = donorList.reduce((acc, d) => (String(d.gender || '').toLowerCase() === 'male' && (d.status || 'pending') === 'accepted' ? acc + 1 : acc), 0);
        const acceptedFemale = donorList.reduce((acc, d) => (String(d.gender || '').toLowerCase() === 'female' && (d.status || 'pending') === 'accepted' ? acc + 1 : acc), 0);
        return {
            total,
            today: total,
            byBloodType,
            acceptedByBloodType,
            ...statusCounts,
            male,
            female,
            acceptedMale,
            acceptedFemale,
        };
    }
};
exports.DonorsService = DonorsService;
exports.DonorsService = DonorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(donor_entity_1.DonorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DonorsService);
//# sourceMappingURL=donors.service.js.map