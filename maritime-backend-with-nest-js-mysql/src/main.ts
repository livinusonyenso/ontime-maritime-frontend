import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { SecurityMiddleware } from './common/middleware/security.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS FIRST before any other middleware
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
  })

  // Set global prefix for all routes
  app.setGlobalPrefix('api')

  app.use(new SecurityMiddleware().use)

  // Added global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const PORT = process.env.PORT || 3001
  await app.listen(PORT)
  console.log(`[OnTime Maritime] Backend running on port ${PORT} | Environment: ${process.env.NODE_ENV}`)
}

bootstrap().catch((err) => {
  console.error('Fatal error during startup:', err)
  process.exit(1)
})
