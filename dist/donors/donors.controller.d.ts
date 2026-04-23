import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
export declare class DonorsController {
    private readonly donorsService;
    constructor(donorsService: DonorsService);
    create(payload: CreateDonorDto): Promise<import("./donor.entity").DonorEntity>;
    findAll(status: string, page?: string, pageSize?: string, gender?: string, nirankarType?: string, minAge?: string, maxAge?: string, q?: string, sortBy?: string, sortDir?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./donor.entity").DonorEntity[];
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
    acceptedSnapshot(limit?: string): Promise<{
        acceptedCount: number;
        donors: import("./donor.entity").DonorEntity[];
    }>;
    findOne(id: string): Promise<import("./donor.entity").DonorEntity>;
    updateStatus(id: string, status: string): Promise<{
        success: boolean;
    }>;
    updateDonor(id: string, payload: UpdateDonorDto): Promise<import("./donor.entity").DonorEntity>;
    deleteDonor(id: string): Promise<{
        success: boolean;
    }>;
}
