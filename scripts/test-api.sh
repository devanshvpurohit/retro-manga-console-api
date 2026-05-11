#!/bin/bash

# Retro Manga Console API - Quick Test Script
# Tests all major endpoints to verify API is working

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_BASE="${API_BASE:-http://localhost:3000}"
TEST_QUERY="naruto"
TEST_SOURCE="comick"

echo "=========================================="
echo "  RETRO MANGA CONSOLE API TEST SUITE"
echo "=========================================="
echo ""
echo "Testing API at: $API_BASE"
echo ""

# Test counter
PASSED=0
FAILED=0

# Helper function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $name... "
    
    response=$(curl -s -w "\n%{http_code}" "$url")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$status_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (HTTP $status_code)"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (Expected HTTP $expected_status, got $status_code)"
        echo "Response: $body"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Test 1: Health Check
test_endpoint "Health Check" "$API_BASE/api/health"

# Test 2: List Sources
test_endpoint "List Sources" "$API_BASE/api/sources"

# Test 3: Search (default source)
test_endpoint "Search (default)" "$API_BASE/api/search?q=$TEST_QUERY"

# Test 4: Search (specific source)
test_endpoint "Search (comick)" "$API_BASE/api/search?q=$TEST_QUERY&source=$TEST_SOURCE"

# Test 5: Trending
test_endpoint "Trending" "$API_BASE/api/trending?source=$TEST_SOURCE"

# Test 6: Get Bookmarks
test_endpoint "Get Bookmarks" "$API_BASE/api/bookmarks"

# Test 7: Bookmark Stats
test_endpoint "Bookmark Stats" "$API_BASE/api/bookmarks?stats=true"

# Test 8: Missing parameter (should fail with 400)
test_endpoint "Error Handling (missing param)" "$API_BASE/api/search" 400

# Test 9: Invalid source (should fail with 500)
test_endpoint "Error Handling (invalid source)" "$API_BASE/api/search?q=test&source=invalid" 500

echo ""
echo "=========================================="
echo "  TEST RESULTS"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    exit 1
fi
