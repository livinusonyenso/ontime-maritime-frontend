#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  OnTime Maritime — Prisma Migration Script
#  Usage:
#    ./scripts/migrate.sh           # development (migrate dev)
#    ./scripts/migrate.sh --prod    # production  (migrate deploy)
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Resolve backend root (one level up from the scripts/ folder) ─────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SCHEMA_PATH="$BACKEND_DIR/prisma/schema.prisma"

# ── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Helpers ───────────────────────────────────────────────────────────────────
step()  { echo -e "\n${CYAN}${BOLD}[$1/4]${RESET} $2"; }
ok()    { echo -e "${GREEN}✓${RESET} $1"; }
fail()  { echo -e "\n${RED}✗ FAILED — $1${RESET}\n"; exit 1; }

# ── Parse flags ───────────────────────────────────────────────────────────────
PROD_MODE=false
for arg in "$@"; do
  [[ "$arg" == "--prod" ]] && PROD_MODE=true
done

# ── Header ────────────────────────────────────────────────────────────────────
echo -e "\n${BOLD}OnTime Maritime — Prisma Migration${RESET}"
echo -e "Mode     : $([ "$PROD_MODE" = true ] && echo "${RED}PRODUCTION (migrate deploy)${RESET}" || echo "${YELLOW}DEVELOPMENT (migrate dev)${RESET}")"
echo -e "Backend  : $BACKEND_DIR"
echo -e "Schema   : $SCHEMA_PATH"
echo "────────────────────────────────────────"

# Sanity checks
[ -f "$BACKEND_DIR/.env" ] || fail ".env file not found in $BACKEND_DIR"
[ -f "$SCHEMA_PATH" ]      || fail "schema.prisma not found at $SCHEMA_PATH"

# Change into backend root so all npx commands resolve correctly
cd "$BACKEND_DIR"

# ─────────────────────────────────────────────────────────────────────────────
# STEP 1 — Check database connection
# ─────────────────────────────────────────────────────────────────────────────
step 1 "Checking database connection…"

if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
  ok "Database connection successful."
else
  fail "Cannot reach the database.\n  Check your DATABASE_URL in .env and ensure the DB server is running."
fi

# ─────────────────────────────────────────────────────────────────────────────
# STEP 2 — Run migrations
# ─────────────────────────────────────────────────────────────────────────────
step 2 "Running migrations…"

if [ "$PROD_MODE" = true ]; then
  echo -e "  ${YELLOW}Running: prisma migrate deploy${RESET}"
  MIGRATION_OUTPUT=$(npx prisma migrate deploy 2>&1) || fail "prisma migrate deploy failed.\n$MIGRATION_OUTPUT"
else
  MIGRATION_NAME="auto_migration_$(date +%Y_%m_%d_%H%M%S)"
  echo -e "  Migration name: ${BOLD}$MIGRATION_NAME${RESET}"
  echo -e "  Running: prisma migrate dev"
  MIGRATION_OUTPUT=$(npx prisma migrate dev --name "$MIGRATION_NAME" 2>&1) || fail "prisma migrate dev failed.\n$MIGRATION_OUTPUT"
fi

echo "$MIGRATION_OUTPUT"

# Parse which migrations were applied (lines containing "Applying migration")
APPLIED=$(echo "$MIGRATION_OUTPUT" | grep -E "Applying migration|No pending migrations" || true)
if [ -n "$APPLIED" ]; then
  ok "Migration result:"
  echo "$APPLIED" | while IFS= read -r line; do echo "    $line"; done
else
  ok "No new migrations to apply — schema is up to date."
fi

# ─────────────────────────────────────────────────────────────────────────────
# STEP 3 — Regenerate Prisma client
# ─────────────────────────────────────────────────────────────────────────────
step 3 "Regenerating Prisma client…"

npx prisma generate 2>&1 | grep -E "Generated|✔|error" || true
ok "Prisma client regenerated."

# ─────────────────────────────────────────────────────────────────────────────
# STEP 4 — Done
# ─────────────────────────────────────────────────────────────────────────────
step 4 "All done."

FINISH_TIME=$(date "+%Y-%m-%d %H:%M:%S")
echo ""
echo -e "  ${GREEN}${BOLD}✓ Migration complete!${RESET}"
echo -e "  ├─ Migrations applied : ${BOLD}$([ "$PROD_MODE" = true ] && echo "migrate deploy (production)" || echo "$MIGRATION_NAME")${RESET}"
echo -e "  ├─ Prisma client      : ${GREEN}updated${RESET}"
echo -e "  └─ Finished at        : $FINISH_TIME"
echo ""
