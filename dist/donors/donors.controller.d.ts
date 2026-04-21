import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
export declare class DonorsController {
    private readonly donorsService;
    constructor(donorsService: DonorsService);
    create(payload: CreateDonorDto): Promise<import("./donor.entity").DonorEntity>;
    findAll(status: string, page?: string, pageSize?: string): Promise<{
        total: number;
        page: number;
        pageSize: number;
        data: import("./donor.entity").DonorEntity[];
    }>;
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
    findOne(id: string): Promise<import("./donor.entity").DonorEntity>;
    updateStatus(id: string, status: string): Promise<{
        success: boolean;
    }>;
}
