import { Controller, Get, Param, Query } from "@nestjs/common"
import { MarketplaceService } from "./marketplace.service"
import { QueryMarketplaceDto } from "./dto/query-marketplace.dto"

/**
 * Public Marketplace API
 *
 * Security model:
 *  - Browse (GET) endpoints are fully public — no authentication required.
 *  - Only active + available listings are surfaced by the service layer.
 *  - Seller PII (email, internal id) is never returned.
 *  - bol_image is only returned on the detail endpoint; the unlock payment
 *    flow is enforced in the frontend (authenticated users only).
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
   * GET /api/marketplace/listings/:id  — fully public
   *
   * Returns full listing detail. Listing must be active; view count is
   * incremented asynchronously. Returns 404 for non-active listings.
   */
  @Get("listings/:id")
  async getListingById(@Param("id") id: string) {
    return this.marketplaceService.findPublicById(id)
  }
}
