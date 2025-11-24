import { PrismaService } from "../../prisma/prisma.service";
import { TrackingLog } from "@prisma/client";
import { CreateTrackingLogDto } from "./dto/create-tracking-log.dto";
export declare class TrackingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTrackingLogDto: CreateTrackingLogDto): Promise<TrackingLog>;
    findByContainer(containerNumber: string, limit?: number): Promise<TrackingLog[]>;
    findByVessel(vesselImo: string, limit?: number): Promise<TrackingLog[]>;
    getLatestPosition(containerNumber: string): Promise<TrackingLog | null>;
    getLatestVesselPosition(vesselImo: string): Promise<TrackingLog | null>;
    getMovementHistory(containerNumber: string, startDate: Date, endDate: Date): Promise<TrackingLog[]>;
}
