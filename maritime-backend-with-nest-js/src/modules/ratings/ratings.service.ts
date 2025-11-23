import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateRatingDto } from './dto/create-rating.dto'

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: createRatingDto.transaction_id },
    })

    if (!transaction) {
      throw new BadRequestException('Transaction not found')
    }

    return this.prisma.rating.create({
      data: {
        user_id: createRatingDto.user_id,
        rater_id: createRatingDto.rater_id,
        score: createRatingDto.score,
        comment: createRatingDto.comment,
      },
    })
  }

  async getRatingsForUser(userId: string, skip = 0, take = 20) {
    return this.prisma.rating.findMany({
      where: { user_id: userId },
      skip,
      take,
      orderBy: { created_at: 'desc' },
    })
  }

  async getAverageRating(userId: string): Promise<number> {
    const result = await this.prisma.rating.aggregate({
      where: { user_id: userId },
      _avg: { score: true },
    })
    return result._avg.score || 0
  }

  async getRatingCount(userId: string): Promise<number> {
    return this.prisma.rating.count({
      where: { user_id: userId },
    })
  }
}
