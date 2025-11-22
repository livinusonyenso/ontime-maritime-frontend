import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { TransactionType, PayoutStatus } from "@prisma/client"
import {  CreateTransactionDto  } from './dto/create-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { buyer_id, seller_id, listing_id, amount, transaction_type } = createTransactionDto

    // Calculate commission (e.g., 5%)
    const commission_amount = Number(amount) * 0.05

    return this.prisma.transaction.create({
      data: {
        buyer_id,
        seller_id,
        listing_id,
        amount,
        commission_amount,
        transaction_type: transaction_type || TransactionType.buy_now,
        payout_status: PayoutStatus.pending,
      },
      include: {
        buyer: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        seller: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        listing: true,
      },
    })
  }

  async findAll(skip = 0, take = 20) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      include: {
        buyer: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        seller: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        listing: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }

  async findById(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        buyer: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        seller: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        listing: true,
        documents: true,
      },
    })

    if (!transaction) {
      throw new NotFoundException("Transaction not found")
    }

    return transaction
  }

  async findByBuyer(buyerId: string, skip = 0, take = 20) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      where: {
        buyer_id: buyerId,
      },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        listing: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }

  async findBySeller(sellerId: string, skip = 0, take = 20) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      where: {
        seller_id: sellerId,
      },
      include: {
        buyer: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        listing: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }
}
