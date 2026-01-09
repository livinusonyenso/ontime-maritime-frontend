import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    create(createRatingDto: CreateRatingDto): Promise<{
        id: string;
        user_id: string;
        rater_id: string;
        score: number;
        comment: string | null;
        created_at: Date;
    }>;
    getRatings(userId: string): Promise<{
        ratings: {
            id: string;
            user_id: string;
            rater_id: string;
            score: number;
            comment: string | null;
            created_at: Date;
        }[];
        average: number;
        count: number;
    }>;
}
