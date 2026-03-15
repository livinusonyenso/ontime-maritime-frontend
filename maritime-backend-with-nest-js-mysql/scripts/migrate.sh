#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  OnTime Maritime — Prisma Migration Script
#
#  Usage:
#    ./scripts/migrate.sh              # dev  — prisma db push (non-interactive)
#    ./scripts/migrate.sh --prod       # prod — prisma migrate deploy
#    ./scripts/migrate.sh --create     # create a named migration file only
#
#  Run from the repo root or from inside the backend folder.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Resolve backend root ──────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SCHEMA_PATH="$BACKEND_DIR/prisma/schema.prisma"

# ── Colours ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

step()  { echo -e "\n${CYAN}${BOLD}[$1]${RESET} $2"; }
ok()    { echo -e "${GREEN}✓${RESET} $1"; }
warn()  { echo -e "${YELLOW}⚠${RESET}  $1"; }
fail()  { echo -e "\n${RED}✗ FAILED — $1${RESET}\n"; exit 1; }

# ── Parse flags ───────────────────────────────────────────────────────────────
PROD_MODE=false
CREATE_MODE=false
for arg in "$@"; do
  [[ "$arg" == "--prod"   ]] && PROD_MODE=true
  [[ "$arg" == "--create" ]] && CREATE_MODE=true
done

# ── Header ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}OnTime Maritime — Prisma Schema Sync${RESET}"
if   [ "$PROD_MODE"   = true ]; then
  echo -e "Mode    : ${RED}${BOLD}PRODUCTION  (migrate deploy)${RESET}"
elif [ "$CREATE_MODE" = true ]; then
  echo -e "Mode    : ${YELLOW}CREATE MIGRATION FILE ONLY${RESET}"
else
  echo -e "Mode    : ${YELLOW}DEVELOPMENT (db push — non-interactive)${RESET}"
fi
echo -e "Backend : $BACKEND_DIR"
echo -e "Schema  : $SCHEMA_PATH"
echo    "────────────────────────────────────────"

# ── Sanity checks ─────────────────────────────────────────────────────────────
[ -f "$BACKEND_DIR/.env" ] || fail ".env not found in $BACKEND_DIR"
[ -f "$SCHEMA_PATH"      ] || fail "schema.prisma not found at $SCHEMA_PATH"

cd "$BACKEND_DIR"

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1 — Check database connection
# ─────────────────────────────────────────────────────────────────────────────
step "1/3" "Checking database connection…"

if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
  ok "Database is reachable."
else
  fail "Cannot reach the database. Check DATABASE_URL in .env and ensure the DB server is running."
fi

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2 — Apply schema changes
# ─────────────────────────────────────────────────────────────────────────────
step "2/3" "Applying schema changes…"

if [ "$PROD_MODE" = true ]; then
  # Production: apply existing migration files (safe, no data loss)
  echo -e "  ${BOLD}npx prisma migrate deploy${RESET}"
  npx prisma migrate deploy || fail "prisma migrate deploy failed."
  ok "Migrations deployed."

elif [ "$CREATE_MODE" = true ]; then
  # Create a migration SQL file without applying it (for code review / git)
  MIGRATION_NAME="migration_$(date +%Y_%m_%d_%H%M%S)"
  echo -e "  ${BOLD}npx prisma migrate dev --name $MIGRATION_NAME --create-only${RESET}"
  npx prisma migrate dev --name "$MIGRATION_NAME" --create-only || fail "Failed to create migration file."
  ok "Migration file created: prisma/migrations/*_${MIGRATION_NAME}/"
  warn "File NOT applied yet. Run without --create to apply."

else
  # Development default: push schema directly to DB (non-interactive, no migration files)
  # --accept-data-loss is required when columns are dropped/renamed
  echo -e "  ${BOLD}npx prisma db push --accept-data-loss${RESET}"
  OUTPUT=$(npx prisma db push --accept-data-loss 2>&1) || fail "prisma db push failed.\n$OUTPUT"
  echo "$OUTPUT" | grep -E "Your database|🚀|error|warn" || true
  ok "Schema pushed to database."
fi

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3 — Regenerate Prisma client
# ─────────────────────────────────────────────────────────────────────────────
step "3/3" "Regenerating Prisma client…"

npx prisma generate 2>&1 | grep -E "Generated|✔|Prisma Client" || true
ok "Prisma client up to date."

# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}✓ Done!${RESET}  Schema is in sync. Restart the server to load the new client."
echo ""
