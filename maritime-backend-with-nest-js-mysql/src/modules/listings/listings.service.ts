import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { ListingCategory, ListingStatus, Prisma } from "@prisma/client"
import {  CreateListingDto  } from './dto/create-listing.dto'
import {  UpdateListingDto  } from './dto/update-listing.dto'

/**
 * Select all listing fields EXCEPT bol_image for list/findMany queries.
 * Excluding the LongText column prevents MySQL "Out of sort memory" (error 1038)
 * because MySQL loads full row data into the sort buffer — a single bol_image
 * can be several MB, exhausting the default 256 KB sort_buffer_size instantly.
 * bol_image is fetched only in findById (single-item detail).
 *
 */
const LIST_SELECT = {
  id:                   true,
  seller_id:            true,
  category:             true,
  marketplace_category: true,
  title:                true,
  description:          true,
  price_usd:            true,
  price_type:           true,
  currency:             true,
  images:               true,
  location:             true,
  specifications:       true,
  condition:            true,
  availability:         true,
  bol_required:         true,
  bol_number:           true,
  bol_verified:         true,
  featured:             true,
  views:                true,
  inquiries:            true,
  seller_name:          true,
  seller_rating:        true,
  status:               true,
  rejection_reason:     true,
  approved_at:          true,
  rejected_at:          true,
  created_at:           true,
  updated_at:           true,
  // bol_image intentionally omitted — fetched only in findById
  seller: { select: { id: true, email: true, first_name: true, last_name: true } },
} satisfies Prisma.ListingSelect

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
      status:           listing.status,
      rejection_reason: listing.rejection_reason ?? null,
      created_at:       listing.created_at,
      updated_at:       listing.updated_at,
    }
  }

  async create(createListingDto: CreateListingDto, sellerId: string) {
    const row = await this.prisma.listing.create({
      data: {
        ...createListingDto,
        seller_id: sellerId,
        status: ListingStatus.pending,
      },
      select: LIST_SELECT,
    })
    return this.mapListing(row)
  }

  async findMySeller(sellerId: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SET SESSION sort_buffer_size = 8388608`
      const rows = await tx.listing.findMany({
        where:   { seller_id: sellerId },
        orderBy: { created_at: 'desc' },
        take:    200,
        select:  LIST_SELECT,
      })
      return rows.map(r => this.mapListing(r))
    })
  }

  async findAll(skip = 0, take = 20) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SET SESSION sort_buffer_size = 8388608`
      const rows = await tx.listing.findMany({
        skip:    Number(skip),
        take:    Number(take),
        where:   { status: ListingStatus.active },
        orderBy: { created_at: 'desc' },
        select:  LIST_SELECT,
      })
      return rows.map(r => this.mapListing(r))
    })
  }

  async search(query: string, skip = 0, take = 20) {
    const rows = await this.prisma.listing.findMany({
      skip:  Number(skip),
      take:  Number(take),
      where: {
        AND: [
          { status: ListingStatus.active },
          { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
        ],
      },
      select: LIST_SELECT,
    })
    return rows.map(r => this.mapListing(r))
  }

  async findByCategory(category: ListingCategory, skip = 0, take = 20) {
    const rows = await this.prisma.listing.findMany({
      skip:   Number(skip),
      take:   Number(take),
      where:  { category, status: ListingStatus.active },
      select: LIST_SELECT,
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
    const row = await this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
      include: {
        seller: { select: { id: true, email: true, first_name: true, last_name: true } },
      },
    })
    return this.mapListing(row)
  }

  async delete(id: string) {
    await this.prisma.listing.delete({ where: { id } })
    return { success: true, id }
  }
}
