import { TrackingService } from "./tracking.service";
import { CreateTrackingLogDto } from './dto/create-tracking-log.dto';
export declare class TrackingController {
    private trackingService;
    constructor(trackingService: TrackingService);
    create(createTrackingLogDto: CreateTrackingLogDto): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }>;
    findByContainer(containerNumber: string, limit?: number): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }[]>;
    findByVessel(vesselImo: string, limit?: number): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }[]>;
    getLatestPosition(containerNumber: string): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }>;
    getLatestVesselPosition(vesselImo: string): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }>;
    getMovementHistory(containerNumber: string, startDate: string, endDate: string): Promise<{
        id: string;
        container_number: string;
        vessel_imo: string | null;
        lat: import("@prisma/client/runtime/library").Decimal;
        lng: import("@prisma/client/runtime/library").Decimal;
        speed: import("@prisma/client/runtime/library").Decimal | null;
        heading: string | null;
        timestamp: Date;
        created_at: Date;
    }[]>;
}
