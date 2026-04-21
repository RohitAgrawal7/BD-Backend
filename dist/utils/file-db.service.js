"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDbService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
let FileDbService = class FileDbService {
    constructor() {
        // DB path is relative to the backend working directory. The developer should
        // `cd backend` before running dev/start scripts (see backend/README.md).
        // Use process.cwd() directly so when running from inside backend/ the
        // resolved path becomes backend/data/db.json (not backend/backend/...).
        const dbPath = process.env.DB_PATH || './data/db.json';
        this.filePath = path.resolve(process.cwd(), dbPath.replace(/^\.\//, ''));
    }
    async ensureFile() {
        try {
            await fs_1.promises.mkdir(path.dirname(this.filePath), { recursive: true });
            await fs_1.promises.access(this.filePath);
        }
        catch (e) {
            // If file doesn't exist, create with empty donors array
            await fs_1.promises.writeFile(this.filePath, JSON.stringify({ donors: [] }, null, 2), 'utf-8');
        }
    }
    async read() {
        await this.ensureFile();
        const raw = await fs_1.promises.readFile(this.filePath, 'utf-8');
        try {
            return JSON.parse(raw);
        }
        catch (e) {
            // reinitialize if corrupted
            await fs_1.promises.writeFile(this.filePath, JSON.stringify({ donors: [] }, null, 2), 'utf-8');
            return { donors: [] };
        }
    }
    async write(data) {
        await this.ensureFile();
        await fs_1.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
};
exports.FileDbService = FileDbService;
exports.FileDbService = FileDbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileDbService);
//# sourceMappingURL=file-db.service.js.map