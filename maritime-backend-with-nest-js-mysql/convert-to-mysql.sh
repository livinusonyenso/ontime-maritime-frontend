#!/bin/bash

# OnTime Maritime - PostgreSQL to MySQL Conversion Script
# Usage: ./convert-to-mysql.sh

set -e

echo "================================================"
echo "OnTime Maritime - PostgreSQL to MySQL Conversion"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if MySQL is installed
check_mysql() {
    if command -v mysql &> /dev/null; then
        echo -e "${GREEN}✓ MySQL client found${NC}"
        mysql --version
    else
        echo -e "${RED}✗ MySQL client not found. Please install MySQL.${NC}"
        exit 1
    fi
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        echo -e "${GREEN}✓ Node.js found${NC}"
        node --version
    else
        echo -e "${RED}✗ Node.js not found. Please install Node.js 18+.${NC}"
        exit 1
    fi
}

# Backup current schema
backup_schema() {
    echo ""
    echo -e "${YELLOW}Backing up current PostgreSQL schema...${NC}"
    if [ -f "prisma/schema.prisma" ]; then
        cp prisma/schema.prisma prisma/schema.prisma.postgresql.backup
        echo -e "${GREEN}✓ Backup created: prisma/schema.prisma.postgresql.backup${NC}"
    fi
}

# Copy MySQL schema
copy_mysql_schema() {
    echo ""
    echo -e "${YELLOW}Installing MySQL schema...${NC}"
    
    if [ -f "mysql-conversion/schema.prisma" ]; then
        cp mysql-conversion/schema.prisma prisma/schema.prisma
        echo -e "${GREEN}✓ MySQL schema installed${NC}"
    else
        echo -e "${RED}✗ MySQL schema not found in mysql-conversion/schema.prisma${NC}"
        exit 1
    fi
}

# Update .env file
update_env() {
    echo ""
    echo -e "${YELLOW}Checking .env configuration...${NC}"
    
    if [ -f ".env" ]; then
        if grep -q "postgresql://" .env; then
            echo -e "${YELLOW}⚠ PostgreSQL connection string found in .env${NC}"
            echo "Please update DATABASE_URL to MySQL format:"
            echo "DATABASE_URL=\"mysql://username:password@localhost:3306/ontime_maritime\""
        elif grep -q "mysql://" .env; then
            echo -e "${GREEN}✓ MySQL connection string found in .env${NC}"
        else
            echo -e "${RED}✗ No DATABASE_URL found in .env${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ No .env file found. Creating from example...${NC}"
        if [ -f "mysql-conversion/.env.mysql.example" ]; then
            cp mysql-conversion/.env.mysql.example .env
            echo -e "${GREEN}✓ Created .env from MySQL example${NC}"
            echo -e "${YELLOW}⚠ Please update the DATABASE_URL with your credentials${NC}"
        fi
    fi
}

# Remove old migrations
remove_migrations() {
    echo ""
    echo -e "${YELLOW}Removing old PostgreSQL migrations...${NC}"
    
    if [ -d "prisma/migrations" ]; then
        rm -rf prisma/migrations
        echo -e "${GREEN}✓ Old migrations removed${NC}"
    else
        echo -e "${GREEN}✓ No migrations to remove${NC}"
    fi
}

# Generate Prisma client
generate_prisma() {
    echo ""
    echo -e "${YELLOW}Generating Prisma client for MySQL...${NC}"
    
    npx prisma generate
    echo -e "${GREEN}✓ Prisma client generated${NC}"
}

# Create database and run migrations
setup_database() {
    echo ""
    echo -e "${YELLOW}Would you like to set up the MySQL database now? (y/n)${NC}"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Running Prisma migrate..."
        npx prisma migrate dev --name init
        echo -e "${GREEN}✓ Database migrated${NC}"
    else
        echo "Skipping database setup."
        echo "Run 'npx prisma migrate dev --name init' manually when ready."
    fi
}

# Main execution
main() {
    echo "This script will convert your project from PostgreSQL to MySQL."
    echo ""
    echo -e "${YELLOW}Prerequisites:${NC}"
    echo "1. MySQL 5.7.8+ or 8.0+ installed and running"
    echo "2. Empty MySQL database created"
    echo "3. MySQL credentials ready"
    echo ""
    echo "Press Enter to continue or Ctrl+C to cancel..."
    read -r
    
    check_node
    check_mysql
    backup_schema
    copy_mysql_schema
    update_env
    remove_migrations
    generate_prisma
    setup_database
    
    echo ""
    echo "================================================"
    echo -e "${GREEN}Conversion complete!${NC}"
    echo "================================================"
    echo ""
    echo "Next steps:"
    echo "1. Update DATABASE_URL in .env if not done"
    echo "2. Run 'npm run start:dev' to test"
    echo "3. Run tests to verify functionality"
    echo ""
    echo "To rollback to PostgreSQL:"
    echo "  cp prisma/schema.prisma.postgresql.backup prisma/schema.prisma"
    echo "  Update DATABASE_URL back to PostgreSQL format"
    echo "  npx prisma generate"
}

main
