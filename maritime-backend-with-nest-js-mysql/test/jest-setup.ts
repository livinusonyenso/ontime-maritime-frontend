// Force test environment variables BEFORE any module imports.
// This prevents the .env file's JWT_SECRET from overriding the test secret.
process.env.JWT_SECRET = 'ontime-secret-key'
process.env.NODE_ENV   = 'test'
