import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    update(id: string, updateData: Prisma.UserUpdateInput): Promise<User>;
    activateSubscription(userId: string, months?: number): Promise<void>;
    deactivateSubscription(userId: string): Promise<void>;
    isSubscriptionActive(userId: string): Promise<boolean>;
    findAll(): Promise<User[]>;
}
