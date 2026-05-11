#!/bin/bash

# Retro Manga Console API - Deployment Script
# Automates deployment to Vercel

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  RETRO MANGA CONSOLE API DEPLOYMENT"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if logged in
echo "Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
fi

# Run type check
echo ""
echo "Running type check..."
npm run type-check

# Run linter
echo ""
echo "Running linter..."
npm run lint || true

# Ask for deployment type
echo ""
echo "Select deployment type:"
echo "1) Preview (development)"
echo "2) Production"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}Deploying to preview...${NC}"
        vercel
        ;;
    2)
        echo ""
        echo -e "${GREEN}Deploying to production...${NC}"
        vercel --prod
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Test your API endpoints"
echo "2. Update ESP32 code with new URL"
echo "3. Monitor logs: vercel logs"
