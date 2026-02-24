import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { ListingStatus, Prisma } from "@prisma/client"
import { QueryMarketplaceDto } from "./dto/query-marketplace.dto"

// ─── Projection ───────────────────────────────────────────────────────────────
// Fields safe for public listing-list responses.
// seller.email and seller.id are intentionally excluded.

const PUBLIC_SELECT = {
  id:                   true,
  title:                true,
  description:          true,
  price_usd:            true,
  price_type:           true,
  currency:             true,
  category:             true,
  marketplace_category: true,
  condition:            true,
  images:               true,
  location:             true,
  specifications:       true,
  seller_name:          true,
  seller_rating:        true,
  bol_required:         true,
  bol_verified:         true,
  featured:             true,
  views:                true,
  inquiries:            true,
  availability:         true,
  status:               true,
  created_at:           true,
  updated_at:           true,
  // seller join: only display name — never email or internal id
  seller: { select: { first_name: true, last_name: true } },
} satisfies Prisma.ListingSelect

// Detail endpoint also surfaces bol_image for the BOL-unlock modal
const DETAIL_SELECT = {
  ...PUBLIC_SELECT,
  bol_image: true,
} satisfies Prisma.ListingSelect

// ─── Mapper ───────────────────────────────────────────────────────────────────

function toPublic(row: any, includeBol = false) {
  const nameFromSeller =
    `${row.seller?.first_name ?? ""} ${row.seller?.last_name ?? ""}`.trim()

  return {
    id:             row.id,
    title:          row.title,
    description:    row.description,
    price:          Number(row.price_usd),
    price_type:     row.price_type           ?? "fixed",
    currency:       row.currency             ?? "USD",
    // Always expose the human-readable marketplace category
    category:       row.marketplace_category ?? row.category,
    condition:      row.condition            ?? "good",
    images:         (row.images as string[]) ?? [],
    preview_image:  ((row.images as string[]) ?? [])[0] ?? null,
    location:       row.location             ?? {},
    specifications: row.specifications       ?? {},
    seller_name:    row.seller_name          || nameFromSeller || "Seller",
    seller_rating:  Number(row.seller_rating ?? 0),
    // BOL flags — visible to buyers so they know verification is possible
    bol_required:   row.bol_required         ?? false,
    bol_verified:   row.bol_verified         ?? false,
    // bol_image only in detail response (paid-unlock flow)
    ...(includeBol ? { bol_image: row.bol_image ?? null } : {}),
    featured:       row.featured             ?? false,
    views:          row.views                ?? 0,
    inquiries:      row.inquiries            ?? 0,
    availability:   row.availability         ?? "available",
    created_at:     row.created_at,
    updated_at:     row.updated_at,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildWhere(q: QueryMarketplaceDto): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {
    status:       ListingStatus.active,
    availability: "available",
  }

  if (q.search?.trim()) {
    where.OR = [
      { title:       { contains: q.search } },
      { description: { contains: q.search } },
    ]
  }

  if (q.category && q.category !== "all") {
    // marketplace_category stores the human-readable label (equipment, vessel, …)
    where.marketplace_category = { contains: q.category }
  }

  if (q.minPrice !== undefined || q.maxPrice !== undefined) {
    where.price_usd = {
      ...(q.minPrice !== undefined ? { gte: q.minPrice } : {}),
      ...(q.maxPrice !== undefined ? { lte: q.maxPrice } : {}),
    }
  }

  if (q.condition && q.condition !== "all") {
    where.condition = q.condition
  }

  return where
}

function buildOrderBy(sort?: string): Prisma.ListingOrderByWithRelationInput {
  switch (sort) {
    case "price_asc":  return { price_usd: "asc" }
    case "price_desc": return { price_usd: "desc" }
    case "featured":   return { featured: "desc" }
    default:           return { created_at: "desc" }
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  /**
   * Paginated, filterable public listing feed.
   * Strips all sensitive seller data; never exposes bol_image.
   */
  async findPublic(query: QueryMarketplaceDto) {
    const skip    = query.skip ?? 0
    const take    = query.take ?? 20
    const where   = buildWhere(query)
    const orderBy = buildOrderBy(query.sort)

    // Run count + data in a single transaction for consistency
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.listing.findMany({
        skip, take, where, orderBy,
        select: PUBLIC_SELECT,
      }),
      this.prisma.listing.count({ where }),
    ])

    return {
      data:  rows.map(r => toPublic(r)),
      total,
      skip,
      take,
      hasMore: skip + take < total,
    }
  }

  /**
   * Single listing detail — includes bol_image for the BOL-unlock modal.
   * Increments view counter asynchronously (fire-and-forget).
   */
  async findPublicById(id: string) {
    const row = await this.prisma.listing.findFirst({
      where: { id, status: ListingStatus.active },
      select: DETAIL_SELECT,
    })

    if (!row) throw new NotFoundException("Listing not found")

    // Non-blocking view increment
    this.prisma.listing
      .update({ where: { id }, data: { views: { increment: 1 } } })
      .catch(() => {/* swallow — not critical */})

    return toPublic(row, true)
  }
}
