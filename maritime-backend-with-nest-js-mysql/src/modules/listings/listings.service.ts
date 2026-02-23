import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { ListingCategory, ListingStatus } from "@prisma/client"
import {  CreateListingDto  } from './dto/create-listing.dto'
import {  UpdateListingDto  } from './dto/update-listing.dto'

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  /** Map a raw DB listing to the MarketplaceListing shape the frontend expects */
  private mapListing(listing: any) {
    const sellerFirst = listing.seller?.first_name ?? ''
    const sellerLast  = listing.seller?.last_name  ?? ''
    return {
      id:            listing.id,
      seller_id:     listing.seller_id,
      seller_name:   (listing.seller_name ?? `${sellerFirst} ${sellerLast}`.trim()) || listing.seller?.email,
      seller_rating: Number(listing.seller_rating ?? 0),
      marketplace_category: listing.marketplace_category ?? listing.category,
      category:      listing.marketplace_category ?? listing.category,
      title:         listing.title,
      description:   listing.description,
      price:         Number(listing.price_usd),
      price_type:    listing.price_type ?? 'fixed',
      currency:      listing.currency   ?? 'USD',
      images:        listing.images     ?? listing.photos ?? [],
      location:      listing.location   ?? {},
      bol_image:     listing.bol_image  ?? null,
      specifications: listing.specifications ?? {},
      condition:     listing.condition  ?? 'good',
      availability:  listing.availability ?? 'available',
      bol_required:  listing.bol_required ?? false,
      bol_number:    listing.bol_number  ?? null,
      bol_verified:  listing.bol_verified ?? false,
      featured:      listing.featured   ?? false,
      views:         listing.views      ?? 0,
      inquiries:     listing.inquiries  ?? 0,
      status:        listing.status,
      created_at:    listing.created_at,
      updated_at:    listing.updated_at,
    }
  }

  async create(createListingDto: CreateListingDto, sellerId: string) {
    return this.prisma.listing.create({
      data: {
        ...createListingDto,
        seller_id: sellerId,
        status: ListingStatus.draft,
      },
    })
  }

  async findMySeller(sellerId: string) {
    const rows = await this.prisma.listing.findMany({
      where: { seller_id: sellerId },
      orderBy: { created_at: 'desc' },
    })
    return rows.map(r => this.mapListing(r))
  }

  async findAll(skip = 0, take = 20) {
    const rows = await this.prisma.listing.findMany({
      skip: Number(skip),
      take: Number(take),
      where: { status: ListingStatus.active },
      include: {
        seller: {
          select: { id: true, email: true, first_name: true, last_name: true },
        },
      },
      orderBy: { created_at: 'desc' },
    })
    console.log(`[ListingsService] findAll → ${rows.length} rows`)
    return rows.map(r => this.mapListing(r))
  }

  async search(query: string, skip = 0, take = 20) {
    const rows = await this.prisma.listing.findMany({
      skip: Number(skip),
      take: Number(take),
      where: {
        AND: [
          { status: ListingStatus.active },
          { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
        ],
      },
      include: {
        seller: { select: { id: true, email: true, first_name: true, last_name: true } },
      },
    })
    return rows.map(r => this.mapListing(r))
  }

  async findByCategory(category: ListingCategory, skip = 0, take = 20) {
    const rows = await this.prisma.listing.findMany({
      skip: Number(skip),
      take: Number(take),
      where: { category, status: ListingStatus.active },
      include: {
        seller: { select: { id: true, email: true, first_name: true, last_name: true } },
      },
    })
    return rows.map(r => this.mapListing(r))
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        seller: { select: { id: true, email: true, first_name: true, last_name: true } },
        documents: true,
        auctions: true,
      },
    })
    if (!listing) throw new NotFoundException("Listing not found")
    return this.mapListing(listing)
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    })
  }

  async delete(id: string) {
    return this.prisma.listing.delete({ where: { id } })
  }
}
