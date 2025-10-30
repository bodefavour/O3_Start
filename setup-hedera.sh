#!/bin/bash

# BorderlessPay Hedera Setup Script
# Quick setup for hackathon demo

echo "🚀 BorderlessPay - Hedera Integration Setup"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with your Hedera credentials"
    exit 1
fi

# Check for required environment variables
echo "📋 Checking environment variables..."

if ! grep -q "HEDERA_OPERATOR_ID" .env; then
    echo "⚠️  HEDERA_OPERATOR_ID not found in .env"
    echo "   Get testnet account from: https://portal.hedera.com"
fi

if ! grep -q "HEDERA_OPERATOR_KEY" .env; then
    echo "⚠️  HEDERA_OPERATOR_KEY not found in .env"
fi

if ! grep -q "NEXT_PUBLIC_HEDERA_TOKEN_ID" .env; then
    echo "⚠️  NEXT_PUBLIC_HEDERA_TOKEN_ID not set"
    echo "   You'll need to create a token first"
fi

echo ""
echo "🔧 Setup Steps:"
echo ""
echo "1. Create Hedera Testnet Account:"
echo "   → Visit: https://portal.hedera.com"
echo "   → Create testnet account"
echo "   → Copy Account ID (0.0.xxxxx) and Private Key"
echo ""
echo "2. Update .env file:"
echo "   HEDERA_NETWORK=testnet"
echo "   HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID"
echo "   HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Create demo stablecoin token:"
echo "   curl -X POST http://localhost:3000/api/hedera/create-token \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{"
echo "       \"name\": \"BorderlessPay USD\","
echo "       \"symbol\": \"BPUSD\","
echo "       \"decimals\": 2,"
echo "       \"initialSupply\": 1000000"
echo "     }'"
echo ""
echo "5. Add token ID to .env:"
echo "   NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.YOUR_TOKEN_ID"
echo ""
echo "6. Restart server and test!"
echo ""
echo "📚 Full documentation: HEDERA_SETUP.md"
echo "✅ Implementation guide: HEDERA_IMPLEMENTATION.md"
echo ""
echo "🎯 Ready for hackathon demo!"
