import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { MarketplaceService } from "./marketplace.service"
import { QueryMarketplaceDto } from "./dto/query-marketplace.dto"
import { OptionalJwtAuthGuard } from "../../guards/optional-jwt-auth.guard"

/**
 * Public Marketplace API
 *
 * Security model:
 *  - Browse (GET) endpoints are fully public — no authentication required.
 *  - Only active + available listings are surfaced by the service layer.
 *  - Seller PII (email, internal id) is never returned.
 *  - bol_image is gated: only returned when the authenticated user has a
 *    BolUnlock record for that listing (paid $20 unlock fee).
 *  - Interaction endpoints (contact, offer, buy, save) live in their own
 *    modules and are individually protected by JwtAuthGuard.
 */
@Controller("marketplace")
export class MarketplaceController {
  constructor(private marketplaceService: MarketplaceService) {}

  /**
   * GET /api/marketplace/listings  — fully public
   *
   * Query params:
   *   search    – full-text across title + description
   *   category  – equipment | vessel | container | crane | spare_parts | repairs | insurance | warehouse
   *   minPrice  – number (USD)
   *   maxPrice  – number (USD)
   *   condition – new | like_new | good | fair | used
   *   sort      – newest (default) | price_asc | price_desc | featured
   *   skip      – pagination offset (default 0)
   *   take      – page size 1–100 (default 20)
   *
   * Response: { data: Listing[], total: number, skip, take, hasMore }
   */
  @Get("listings")
  async getListings(@Query() query: QueryMarketplaceDto) {
    return this.marketplaceService.findPublic(query)
  }

  /**
   * GET /api/marketplace/listings/:id
   *
   * Public endpoint with optional auth. Increments view count asynchronously.
   * If authenticated and the user has a BolUnlock record for this listing,
   * bol_image is included in the response. Otherwise it is omitted.
   */
  @Get("listings/:id")
  @UseGuards(OptionalJwtAuthGuard)
  async getListingById(@Param("id") id: string, @Req() req: Request) {
    const buyerId: string | undefined = (req as any).user?.id
    return this.marketplaceService.findPublicById(id, buyerId)
  }
}
