"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const security_middleware_1 = require("./common/middleware/security.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174',
            'https://ontimemaritime.com',
            'https://www.ontimemaritime.com',
            'https://ontime-maritime.onrender.com',
            'https://ontime-maritime-1.onrender.com',
            ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');
    app.use(new security_middleware_1.SecurityMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);
    console.log(`[OnTime Maritime] Backend running on port ${PORT} | Environment: ${process.env.NODE_ENV}`);
}
bootstrap().catch((err) => {
    console.error('Fatal error during startup:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map