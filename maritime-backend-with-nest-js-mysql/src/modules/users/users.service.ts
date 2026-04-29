import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { User, Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        role: createUserDto.role || 'buyer',
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phone } })
  }

  async update(id: string, updateData: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    })
  }

  async activateSubscription(userId: string, months = 12): Promise<void> {
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + months)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscription_status: 'paid',
        subscription_expiry: expiryDate,
      },
    })
  }

  async deactivateSubscription(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscription_status: 'free',
      },
    })
  }

  async isSubscriptionActive(userId: string): Promise<boolean> {
    const user = await this.findById(userId)
    if (!user) return false

    if (user.subscription_status !== 'paid') return false
    if (!user.subscription_expiry) return false

    return new Date() <= user.subscription_expiry
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }
}
