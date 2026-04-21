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
const donors_module_1 = require("./donors/donors.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const donor_entity_1 = require("./donors/donor.entity");
// Enforce Postgres-only configuration: require DATABASE_URL for Supabase.
const databaseUrl = process.env.DATABASE_URL || process.env.TYPEORM_URL || process.env.SUPABASE_DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL (Supabase/Postgres) is required in environment. Set DATABASE_URL in backend/.env');
}
const typeormConfig = {
    type: 'postgres',
    url: databaseUrl,
    ssl: process.env.TYPEORM_SSL === 'false' ? false : { rejectUnauthorized: false },
    entities: [donor_entity_1.DonorEntity],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: false,
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot(typeormConfig), donors_module_1.DonorsModule, auth_module_1.AuthModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map