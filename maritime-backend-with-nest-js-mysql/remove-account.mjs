/**
 * remove-account.mjs
 * Deletes a user account (and all related records) by email address.
 *
 * Usage:
 *   node remove-account.mjs <email>
 *
 * Examples:
 *   node remove-account.mjs john@example.com
 */

import { PrismaClient } from "@prisma/client"

const email = process.argv[2]

if (!email) {
  console.error("Usage: node remove-account.mjs <email>")
  process.exit(1)
}

const prisma = new PrismaClient()

async function main() {
  console.log(`\nLooking up: ${email}\n`)

  // ── 1. Check pending_registrations ─────────────────────────────────────
  const pending = await prisma.pendingRegistration.findUnique({ where: { email } })
  if (pending) {
    await prisma.pendingRegistration.delete({ where: { id: pending.id } })
    console.log(`✓ Deleted pending registration  (id: ${pending.id})`)
  }

  // ── 2. Check users table ────────────────────────────────────────────────
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    if (!pending) {
      console.log("✗ No account or pending registration found for that email.")
    }
    return
  }

  console.log(`Found user:`)
  console.log(`  id    : ${user.id}`)
  console.log(`  email : ${user.email}`)
  console.log(`  role  : ${user.role}`)
  console.log(`  verified: email=${user.is_email_verified}  phone=${user.is_phone_verified}`)
  console.log(`  created : ${user.created_at}\n`)

  // ── 3. Delete related records in safe order ─────────────────────────────
  const userId = user.id

  const otps         = await prisma.otpToken.deleteMany({ where: { user_id: userId } })
  const notifs       = await prisma.notification.deleteMany({ where: { user_id: userId } })

  // Soft-delete tables — delete only if models exist in your schema
  let kyc = { count: 0 }
  try { kyc = await prisma.kYC.deleteMany({ where: { user_id: userId } }) } catch (_) {}

  let ratings = { count: 0 }
  try { ratings = await prisma.rating.deleteMany({
    where: { OR: [{ rater_id: userId }, { rated_id: userId }] }
  }) } catch (_) {}

  let bids = { count: 0 }
  try { bids = await prisma.bid.deleteMany({ where: { bidder_id: userId } }) } catch (_) {}

  let listings = { count: 0 }
  try { listings = await prisma.listing.deleteMany({ where: { seller_id: userId } }) } catch (_) {}

  let transactions = { count: 0 }
  try { transactions = await prisma.transaction.deleteMany({
    where: { OR: [{ buyer_id: userId }, { seller_id: userId }] }
  }) } catch (_) {}

  // ── 4. Delete the user ──────────────────────────────────────────────────
  await prisma.user.delete({ where: { id: userId } })

  console.log("Deleted related records:")
  console.log(`  OTP tokens    : ${otps.count}`)
  console.log(`  Notifications : ${notifs.count}`)
  console.log(`  KYC           : ${kyc.count}`)
  console.log(`  Ratings       : ${ratings.count}`)
  console.log(`  Bids          : ${bids.count}`)
  console.log(`  Listings      : ${listings.count}`)
  console.log(`  Transactions  : ${transactions.count}`)
  console.log(`\n✓ User account deleted: ${email}`)
}

main()
  .catch((err) => {
    console.error("\n✗ Error:", err.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
