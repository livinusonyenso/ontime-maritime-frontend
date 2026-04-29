import { SetMetadata } from "@nestjs/common"
import { ROLES_KEY } from "../guards/roles.guard"

/** Restrict an endpoint to specific user roles.
 *  @example @Roles('buyer', 'admin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)
