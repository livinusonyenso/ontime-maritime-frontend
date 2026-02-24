import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { RolesGuard }   from "../../guards/roles.guard"
import { Roles }        from "../../decorators/roles.decorator"
import { MarketplaceService } from "./marketplace.service"
import { QueryMarketplaceDto } from "./dto/query-marketplace.dto"

/**
 * Public Marketplace API
 *
 * Security model:
 *  - JWT required on every route (no anonymous browsing)
 *  - Buyers, sellers, admins, and experts can browse listings
 *  - Only active + available listings are surfaced
 *  - Seller PII (email, internal id) is never returned
 *  - bol_image (the private document) is only returned on the detail route,
 *    gated behind the BOL-unlock payment flow in the frontend
 */
@Controller("marketplace")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarketplaceController {
  constructor(private marketplaceService: MarketplaceService) {}

  /**
   * GET /api/marketplace/listings
   *
   * Query params:
   *   search    – full-text across title + description
   *   category  – equipment | vessel | container | crane | spare_parts | repairs | insurance | warehouse
   *   minPrice  – number (USD)
   *   maxPrice  – number (USD)
   *   condition – new | like_new | good | fair | used
   *   sort      – newest (default) | price_asc | price_desc | featured
   *   skip      – pagination offset (default 0)
   *   take      – page size 1-100 (default 20)
   *
   * Response: { data: Listing[], total: number, skip, take, hasMore }
   */
  @Get("listings")
  @Roles("buyer", "seller", "admin", "executive", "expert")
  async getListings(@Query() query: QueryMarketplaceDto) {
    return this.marketplaceService.findPublic(query)
  }

  /**
   * GET /api/marketplace/listings/:id
   *
   * Returns full listing detail including bol_image.
   * Accessible by any authenticated user; view count is incremented.
   */
  @Get("listings/:id")
  @Roles("buyer", "seller", "admin", "executive", "expert")
  async getListingById(@Param("id") id: string) {
    return this.marketplaceService.findPublicById(id)
  }
}
