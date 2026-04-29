import nodemailer from "nodemailer"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))

// Parse .env manually (no dotenv needed)
const envRaw = readFileSync(join(__dirname, ".env"), "utf8")
const env = {}
for (const line of envRaw.split("\n")) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) continue
  const idx = trimmed.indexOf("=")
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const val = trimmed.slice(idx + 1).trim().replace(/^"|"$/g, "")
  env[key] = val
}

const TEST_TO = "ontimemaritime@gmail.com"
const OTP_CODE = Math.floor(100000 + Math.random() * 900000).toString()

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: env.MAIL_SECURE === "true",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
})

console.log("Transporter config:")
console.log(`  host  : ${env.MAIL_HOST}`)
console.log(`  port  : ${env.MAIL_PORT}`)
console.log(`  secure: ${env.MAIL_SECURE}`)
console.log(`  user  : ${env.MAIL_USER}`)
console.log(`  from  : ${env.MAIL_FROM}`)
console.log(`  to    : ${TEST_TO}`)
console.log(`  OTP   : ${OTP_CODE}`)
console.log("")

try {
  console.log("Verifying SMTP connection…")
  await transporter.verify()
  console.log("✓ SMTP connection OK\n")

  console.log("Sending OTP email…")
  const info = await transporter.sendMail({
    from: env.MAIL_FROM,
    to: TEST_TO,
    subject: "Your OnTime Maritime verification code",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
        <h2 style="color:#1a3c5e;margin-bottom:8px">OnTime Maritime</h2>
        <p style="color:#333;margin-bottom:16px">Use the code below to complete your registration. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a3c5e;text-align:center;padding:16px;background:#f4f8fc;border-radius:6px;margin-bottom:16px">
          ${OTP_CODE}
        </div>
        <p style="color:#666;font-size:13px">If you did not request this code, you can safely ignore this email.</p>
      </div>
    `,
  })

  console.log("✓ Email sent!")
  console.log(`  Message ID: ${info.messageId}`)
  console.log(`  Response  : ${info.response}`)
} catch (err) {
  console.error("✗ Failed:", err.message)
  if (err.code) console.error("  Code:", err.code)
  if (err.response) console.error("  Server response:", err.response)
  process.exit(1)
}
