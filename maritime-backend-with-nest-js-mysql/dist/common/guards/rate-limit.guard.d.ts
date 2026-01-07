import { type CanActivate, type ExecutionContext } from "@nestjs/common";
export declare class RateLimitGuard implements CanActivate {
    private requestMap;
    private readonly MAX_REQUESTS;
    private readonly WINDOW_MS;
    canActivate(context: ExecutionContext): boolean;
}
