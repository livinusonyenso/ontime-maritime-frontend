import { PrismaService } from '../../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
export declare class RatingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRatingDto: CreateRatingDto): Promise<{
        id: string;
        user_id: string;
        rater_id: string;
        score: number;
        comment: string | null;
        created_at: Date;
    }>;
    getRatingsForUser(userId: string, skip?: number, take?: number): Promise<{
        id: string;
        user_id: string;
        rater_id: string;
        score: number;
        comment: string | null;
        created_at: Date;
    }[]>;
    getAverageRating(userId: string): Promise<number>;
    getRatingCount(userId: string): Promise<number>;
}
