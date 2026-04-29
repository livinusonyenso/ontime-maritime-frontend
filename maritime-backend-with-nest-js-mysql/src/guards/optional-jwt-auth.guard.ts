import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Same as JwtAuthGuard but does NOT throw if the request is unauthenticated.
 * Use this on endpoints that are public but need to know if a user is logged in
 * (e.g., marketplace detail endpoint that conditionally returns gated content).
 *
 * When a valid JWT is provided, req.user is populated as normal.
 * When no JWT (or an invalid one) is provided, req.user is undefined.
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // Override to swallow auth errors instead of throwing 401
  handleRequest(_err: any, user: any) {
    return user ?? null
  }
}
