import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { ListingCategory, ListingStatus } from "@prisma/client"
import {  CreateListingDto  } from './dto/create-listing.dto'
import {  UpdateListingDto  } from './dto/update-listing.dto'

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, sellerId: string) {
    return this.prisma.listing.create({
      data: {
        ...createListingDto,
        seller_id: sellerId,
        status: ListingStatus.draft,
      },
    })
  }

  async findAll(skip = 0, take = 20) {
    return this.prisma.listing.findMany({
      skip,
      take,
      where: {
        status: ListingStatus.active,
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
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }

  async search(query: string, skip = 0, take = 20) {
    return this.prisma.listing.findMany({
      skip,
      take,
      where: {
        AND: [
          {
            status: ListingStatus.active,
          },
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
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
      },
    })
  }

  async findByCategory(category: ListingCategory, skip = 0, take = 20) {
    return this.prisma.listing.findMany({
      skip,
      take,
      where: {
        category,
        status: ListingStatus.active,
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
      },
    })
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        documents: true,
        auctions: true,
      },
    })

    if (!listing) {
      throw new NotFoundException("Listing not found")
    }

    return listing
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    })
  }

  async delete(id: string) {
    return this.prisma.listing.delete({
      where: { id },
    })
  }
}
