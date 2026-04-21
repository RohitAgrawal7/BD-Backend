import { Repository } from 'typeorm';
import { DonorEntity } from './donor.entity';
export declare class DonorsService {
    private readonly repo;
    constructor(repo: Repository<DonorEntity>);
    private normalizeInput;
    create(payload: any): Promise<DonorEntity>;
    findAll(opts: {
        status?: string;
        page?: number;
        pageSize?: number;
    }): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: DonorEntity[];
    }>;
    findOne(id: number): Promise<DonorEntity | null>;
    updateStatus(id: number, status: DonorEntity['status']): Promise<boolean | 0 | undefined>;
    stats(): Promise<{
        male: number;
        female: number;
        acceptedMale: number;
        acceptedFemale: number;
        accepted: number;
        rejected: number;
        pending: number;
        total: number;
        today: number;
        byBloodType: Record<string, number>;
        acceptedByBloodType: Record<string, number>;
    }>;
}
