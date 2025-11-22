import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { SecurityMiddleware } from './common/middleware/security.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

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

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  const PORT = process.env.PORT || 3001
  await app.listen(PORT)
  console.log(`[OnTime Maritime] Backend running on port ${PORT} | Environment: ${process.env.NODE_ENV}`)
}

bootstrap().catch((err) => {
  console.error('Fatal error during startup:', err)
  process.exit(1)
})
