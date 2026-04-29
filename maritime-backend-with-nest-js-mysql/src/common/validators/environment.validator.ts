export class EnvironmentValidator {
  static validateProduction(): void {
    const requiredEnvVars = [
      "DATABASE_URL",
      "JWT_SECRET",
      "TERMII_API_KEY",
      "PAYSTACK_SECRET_KEY",
      "MARINETRAFFIC_API_KEY",
      "AWS_ACCESS_KEY_ID",
      "AWS_SECRET_ACCESS_KEY",
      "AWS_S3_BUCKET",
    ]

    const missingVars = requiredEnvVars.filter((v) => !process.env[v])

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(", ")}. Production cannot start.`)
    }

    // Validate JWT_SECRET strength
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be at least 32 characters long")
    }

    // Validate database URL format
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("postgresql://")) {
      throw new Error("DATABASE_URL must be a valid PostgreSQL connection string")
    }

    console.log("[✓] Environment validation passed")
  }

  static logEnvironmentStatus(): void {
    const safe = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      JWT_EXPIRY: process.env.JWT_EXPIRY,
      DATABASE_CONNECTED: !!process.env.DATABASE_URL,
      FRAUD_DETECTION: process.env.ENABLE_FRAUD_DETECTION === "true",
      EXECUTIVE_CORNER: process.env.ENABLE_EXECUTIVE_CORNER === "true",
      AUDIT_LOGGING: process.env.ENABLE_AUDIT_LOGGING === "true",
    }

    console.log("[OnTime Maritime] Environment Status:", safe)
  }
}
