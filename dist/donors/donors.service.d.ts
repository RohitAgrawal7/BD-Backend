import { Repository } from 'typeorm';
import { DonorEntity } from './donor.entity';
import { UpdateDonorDto } from './dto/update-donor.dto';
export declare class DonorsService {
    private readonly repo;
    constructor(repo: Repository<DonorEntity>);
    private normalizeInput;
    create(payload: any): Promise<DonorEntity>;
    findAll(opts: {
        status?: string;
        page?: number;
        pageSize?: number;
        gender?: string;
        nirankarType?: string;
        minAge?: number;
        maxAge?: number;
        q?: string;
        sortBy?: string;
        sortDir?: string;
    }): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: DonorEntity[];
    }>;
    findOne(id: number): Promise<DonorEntity | null>;
    updateStatus(id: number, status: DonorEntity['status']): Promise<boolean | 0 | undefined>;
    updateDonor(id: number, payload: UpdateDonorDto): Promise<DonorEntity | null>;
    deleteDonor(id: number): Promise<boolean>;
    acceptedSnapshot(limit: number): Promise<{
        acceptedCount: number;
        donors: DonorEntity[];
    }>;
    stats(): Promise<{
        total: number;
        today: number;
        byBloodType: Record<string, number>;
        acceptedByBloodType: Record<string, number>;
        accepted: number;
        rejected: number;
        pending: number;
        male: number;
        female: number;
        acceptedMale: number;
        acceptedFemale: number;
    }>;
}
