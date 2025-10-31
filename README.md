# BorderlessPay

**Global Payment Platform powered by Hedera Blockchain**

BorderlessPay is a modern, borderless payment solution that enables instant cross-border transactions using stablecoins and local currencies on the Hedera network. Built with Next.js, React, and Hedera Token Service (HTS).

---

## 🌟 Features

- **Multi-Wallet Support**: Connect with HashPack, MetaMask, and other Web3 wallets
- **Hedera Integration**: Native support for Hedera blockchain and HTS tokens
- **Stablecoin Payments**: Send/receive USDC, USDT, and custom stablecoins (BPUSD)
- **Local Currency Support**: NGN, KES, GHS, and more
- **Real-time Transactions**: Instant settlement with Hedera's fast consensus
- **Invoice Management**: Create, send, and track invoices
- **Payroll System**: Manage employee payments in multiple currencies
- **Analytics Dashboard**: Track payments, revenue, and transaction history
- **QR Code Payments**: Scannable QR codes for easy wallet addresses

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm/yarn
- A Hedera testnet account ([Get one free](https://portal.hedera.com))
- HashPack wallet ([Download](https://www.hashpack.app/))

### Installation

```bash
# Clone the repository
git clone https://github.com/bodefavour/O3_Start.git
cd O3_Start

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set up database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your app running!

---

## 🔐 Environment Configuration

Create a `.env.local` file in the root directory:

```env
# WalletConnect Configuration
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Hedera Testnet Configuration
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.XXXXXXX
HEDERA_OPERATOR_KEY=your_private_key_hex

# BorderlessPay USD Token (Create using npm run hedera:create-token)
NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.XXXXXXX

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database

# Better Auth
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### Getting Your Hedera Credentials

1. **Create Testnet Account**:
   - Visit [Hedera Portal](https://portal.hedera.com)
   - Sign in and navigate to "Testnet" → "Create Account"
   - Save your Account ID (0.0.XXXXXXX) and Private Key

2. **Get WalletConnect Project ID**:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a new project
   - Copy your Project ID

3. **Get Testnet HBAR** (Free):
   - Go to [Hedera Portal Faucet](https://portal.hedera.com)
   - Enter your Account ID
   - Receive 10,000 test HBAR

### 🚀 Backend Signing Mode (Recommended for Development)

BorderlessPay includes a **backend signing mode** that bypasses wallet connection entirely - perfect for hackathons, demos, and rapid development!

#### Why Backend Signing?

**Traditional Wallet Flow** (Complex):
```
User clicks "Send" 
  → Opens wallet popup
  → User signs transaction
  → Wallet submits to Hedera
  → Wait for confirmation
```

**Backend Signing Flow** (Simple):
```
User clicks "Send"
  → Backend signs with operator key
  → Instant submission to Hedera
  → Transaction complete ✅
```

**Benefits**:
- ✅ No wallet installation required
- ✅ No popup approvals
- ✅ Instant transactions
- ✅ Perfect for demos
- ✅ Works on any device/browser
- ✅ No WalletConnect setup needed

#### Enable Backend Signing

Add these variables to your `.env.local`:

```env
# Backend Signing Configuration
NEXT_PUBLIC_BACKEND_SIGNING_ENABLED=true
NEXT_PUBLIC_DEV_BYPASS_ACCOUNT=0.0.4826582

# Operator Account (Your Hedera Account)
NEXT_PUBLIC_HEDERA_OPERATOR_ID=0.0.4826582
NEXT_PUBLIC_HEDERA_OPERATOR_KEY=0x913661cd84365d6aee62382e9a57710972539f173482fa35bc6ff9cac77f5905
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

**⚠️ Important**: Backend signing is for **development/demo only**. Never expose private keys in production!

#### How It Works

1. **Auto-Login**: App automatically logs you in with the operator account
2. **Direct Signing**: Transactions are signed server-side using Hedera SDK
3. **Mirror Node Integration**: All data fetched directly from Hedera Mirror Node
4. **Real Blockchain**: Uses real Hedera testnet (not simulated)

**Architecture**:
```
User Action (Send $100 BPUSD)
    ↓
Frontend (SendModal.tsx)
    ↓
API Route (/api/hedera/transfer)
    ↓
Hedera SDK (Signs with operator key)
    ↓
Hedera Testnet (Transaction submitted)
    ↓
Mirror Node (Transaction confirmed)
    ↓
Frontend (Success + HashScan link)
```

#### API Endpoints (Backend Signing)

**Balance Check**:
```typescript
GET /api/hedera/balance?accountId=0.0.4826582
Response: {
  success: true,
  data: {
    accountId: "0.0.4826582",
    hbarBalance: "713.87",
    tokens: [
      {
        tokenId: "0.0.7167755",
        symbol: "BPUSD",
        name: "BorderlessPay USD",
        balance: "950.00",
        decimals: 2
      }
    ]
  }
}
```

**Send Transaction**:
```typescript
POST /api/hedera/transfer
Body: {
  recipientId: "0.0.5555555",
  amount: "100.00",
  tokenId: "0.0.7167755", // Or "HBAR" for HBAR transfers
  memo: "Payment for services"
}

Response: {
  success: true,
  data: {
    transactionId: "0.0.4826582@1761929088.725746098",
    explorerUrl: "https://hashscan.io/testnet/transaction/...",
    status: "SUCCESS"
  }
}
```

**Transaction History**:
```typescript
GET /api/hedera/transactions?accountId=0.0.4826582&limit=20
Response: {
  success: true,
  data: {
    transactions: [
      {
        id: "0.0.4826582@1761929088.725746098",
        type: "outgoing",
        amount: "100.00",
        currency: "BPUSD",
        status: "completed",
        createdAt: "2025-10-31T12:34:56.789Z"
      }
    ]
  }
}
```

**Real-Time HBAR Price**:
```typescript
GET /api/hedera/price
Response: {
  success: true,
  data: {
    hbarPrice: 0.0562,
    source: "coingecko",
    timestamp: "2025-10-31T12:34:56.789Z"
  }
}
```

#### Key Features

**1. Live Blockchain Data**
- All balances fetched from Mirror Node API
- Real-time transaction history
- Accurate token metadata (names, symbols, decimals)

**2. Multi-Token Support**
- HBAR transfers
- HTS token transfers (BPUSD, USDC, etc.)
- Automatic token discovery
- Proper decimal handling

**3. Smart Portfolio Calculation**
```javascript
Portfolio Value Algorithm:
- HBAR: amount × real-time CoinGecko price (~$0.056)
- Stablecoins (USD/USDC/USDT/BPUSD): amount × $1.00
- Small test tokens (<10k): amount × $0.01
- Large test tokens (>10k): excluded (worthless test tokens)
```

**4. Transaction Details Modal**
- Click any transaction to view full details
- Shows all token transfers
- HBAR transfer breakdown
- Links to HashScan explorer
- Transaction fees and timestamps

#### Testing Backend Signing

```bash
# 1. Ensure backend signing is enabled
echo "NEXT_PUBLIC_BACKEND_SIGNING_ENABLED=true" >> .env.local

# 2. Start the dev server
npm run dev

# 3. Visit the wallet page
open http://localhost:3000/wallet

# 4. Test send/receive
# - No wallet connection needed!
# - Click "Send" → Enter recipient → Amount → Send
# - Transaction executes immediately
# - View on HashScan explorer
```

#### File Structure (Backend Signing)

```
src/
├── app/api/hedera/
│   ├── balance/route.ts          # Fetch HBAR & token balances
│   ├── transfer/route.ts         # Send HBAR/tokens (backend signing)
│   ├── transactions/route.ts     # Transaction history from Mirror Node
│   ├── transaction/[id]/route.ts # Single transaction details
│   └── price/route.ts           # Real-time HBAR price (CoinGecko)
├── components/wallet/
│   ├── SendModal.tsx                    # Multi-token send modal
│   ├── ReceiveModal.tsx                 # QR code receive modal
│   ├── TransactionDetailsModal.tsx      # Transaction detail viewer
│   └── SwapModal.tsx                    # Currency swap (coming soon)
├── lib/web3/
│   ├── hedera-token.ts          # HTS token utilities
│   └── provider.ts              # Hedera client setup
└── app/(authenticated)/wallet/page.tsx  # Main wallet interface
```

#### Environment Variables Explained

```env
# ============================================
# BACKEND SIGNING MODE
# ============================================

# Enable backend signing (bypass wallet)
NEXT_PUBLIC_BACKEND_SIGNING_ENABLED=true

# Auto-login account (skip auth for demos)
NEXT_PUBLIC_DEV_BYPASS_ACCOUNT=0.0.4826582

# ============================================
# HEDERA CONFIGURATION
# ============================================

# Your Hedera testnet account
NEXT_PUBLIC_HEDERA_OPERATOR_ID=0.0.4826582

# Your private key (NEVER commit to Git!)
NEXT_PUBLIC_HEDERA_OPERATOR_KEY=0x913661cd84365d6aee62382e9a57710972539f173482fa35bc6ff9cac77f5905

# Network (testnet or mainnet)
NEXT_PUBLIC_HEDERA_NETWORK=testnet

# Your HTS token (BPUSD)
NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.7167755

# ============================================
# OPTIONAL: WALLET CONNECT (if using wallets)
# ============================================
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

#### Production Considerations

**⚠️ Security Warning**: Backend signing exposes your private key. Only use for:
- ✅ Development
- ✅ Hackathon demos
- ✅ MVP prototypes
- ✅ Testnet only

**For Production**, implement proper wallet flow:

```env
# Disable backend signing
NEXT_PUBLIC_BACKEND_SIGNING_ENABLED=false

# Remove dev bypass
# NEXT_PUBLIC_DEV_BYPASS_ACCOUNT=  # Comment out

# Keep only public configs
NEXT_PUBLIC_HEDERA_NETWORK=mainnet
NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.XXXXXXX
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

**Production Architecture**:
```
User → HashPack Wallet (User signs) → Hedera Mainnet
```

**Development Architecture** (Current):
```
User → Backend API (Operator signs) → Hedera Testnet
```

---

## 🪙 Create Your Stablecoin Token

BorderlessPay uses Hedera Token Service (HTS) to create a custom BPUSD stablecoin:

```bash
# Check your Hedera account balance
npm run hedera:check

# Create BPUSD token (1M initial supply)
npm run hedera:create-token

# Associate token with your account
npm run hedera:associate
```

After creating the token, add the Token ID to your `.env.local`:
```env
NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.XXXXXXX
```

---

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with sample data
npm run db:setup         # Setup database (first time)

# Hedera Blockchain
npm run hedera:check           # Check account balance and tokens
npm run hedera:create-token    # Create BPUSD stablecoin
npm run hedera:associate       # Associate token with account
```

---

## 🏗️ Project Structure

```
O3_Start/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (authenticated)/   # Protected routes (dashboard, wallet, etc.)
│   │   ├── (public)/          # Public routes (landing page)
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── hedera/        # Hedera blockchain APIs
│   │   │   ├── invoices/      # Invoice management
│   │   │   ├── payments/      # Payment processing
│   │   │   └── transactions/  # Transaction history
│   │   ├── signin/            # Sign in page
│   │   ├── register/          # Registration page
│   │   └── wallet/            # Wallet page
│   ├── components/            # React components
│   │   ├── hedera/           # Hedera-specific components
│   │   │   ├── HashPackConnect.tsx     # Wallet connection
│   │   │   ├── TransactionLink.tsx     # HashScan links
│   │   │   └── HederaAccountInput.tsx  # Account input field
│   │   ├── wallet/           # Wallet components
│   │   │   ├── SendModal.tsx          # Send money modal
│   │   │   ├── ReceiveModal.tsx       # Receive money modal
│   │   │   └── SwapModal.tsx          # Currency swap modal
│   │   ├── ui/               # Shadcn UI components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities and configurations
│   │   ├── web3/            # Blockchain utilities
│   │   │   ├── hedera-token.ts      # HTS token functions
│   │   │   ├── provider.ts          # Hedera client setup
│   │   │   └── hashconnect.ts       # HashConnect integration
│   │   ├── better-auth/     # Authentication
│   │   └── utils.ts         # Helper functions
│   ├── db/                  # Database (Drizzle ORM)
│   │   ├── schema.ts        # Database schema
│   │   ├── index.ts         # DB connection
│   │   └── seed.ts          # Seed data
│   ├── hooks/               # React hooks
│   │   ├── useWallet.ts     # Wallet operations
│   │   ├── useCurrentUser.ts # User authentication
│   │   └── useInvoices.ts   # Invoice management
│   └── styles/              # Global styles
├── scripts/                 # Utility scripts
│   ├── check-hedera-account.ts    # Check Hedera account
│   ├── create-hedera-token.ts     # Create HTS token
│   └── associate-token.ts         # Associate token
├── public/                  # Static files
└── prisma/                 # Prisma schema (if using)
```

---

## 🔗 Hedera Integration Details

### Current Testnet Configuration

**Account Details**:
```
Account ID: 0.0.4826582
EVM Address: 0xed8e41de34ff64ad3b2fea5df4e092181b8c97d4
HBAR Balance: 713.87 ℏ
```

**BPUSD Token**:
```
Token ID: 0.0.7167755
Token Name: BorderlessPay USD
Token Symbol: BPUSD
Decimals: 2
Initial Supply: 1,000,000 BPUSD
Token Type: Fungible (HTS)
Explorer: https://hashscan.io/testnet/token/0.0.7167755
```

### How Send/Receive Works

#### **Receive Function**
1. User clicks "Receive" button
2. Shows Hedera Account ID (0.0.4826582)
3. Displays scannable QR code
4. Sender scans QR → Sends tokens → User receives instantly

#### **Send Function**
1. User clicks "Send Money"
2. Enters recipient Account ID (0.0.XXXXXXX)
3. Enters amount and optional note
4. Clicks "Send Now"
5. **HashPack wallet opens for approval** (user signs transaction)
6. Transaction signed with user's private key
7. Transaction submitted to Hedera network
8. Success screen with HashScan explorer link

### Token Association

Before receiving HTS tokens, accounts must **associate** the token (one-time setup):

```bash
npm run hedera:associate
```

Or users can associate via HashPack wallet interface.

---

## 🔐 Security Notes

- **Private keys** are stored in `.env.local` (never commit to Git)
- **Wallet signing**: Transactions are signed by user's HashPack wallet, not backend
- **Backend signing**: Only used for operator account (treasury) operations
- **Testnet only**: Current configuration uses Hedera testnet for testing

### Production Checklist

- [ ] Move to Hedera mainnet
- [ ] Use environment variable management (Vercel, Railway, etc.)
- [ ] Implement proper key management (AWS KMS, HashiCorp Vault)
- [ ] Add rate limiting for API endpoints
- [ ] Enable CORS properly
- [ ] Use production database (not local SQLite)
- [ ] Configure proper error monitoring (Sentry, etc.)

---

## 🛠️ Tech Stack

**Frontend**:
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

**Blockchain**:
- Hedera SDK (@hashgraph/sdk)
- Hedera WalletConnect (@hashgraph/hedera-wallet-connect)
- HashConnect (HashPack integration)
- Ethers.js (EVM compatibility)

**Backend**:
- Next.js API Routes
- Drizzle ORM
- PostgreSQL (Neon)
- Better Auth (Authentication)

**Tools**:
- ESLint + Prettier
- TypeScript
- Drizzle Kit
- TSX (TypeScript execution)

---

## 📱 Wallet Connection

### Supported Wallets

1. **HashPack** (Recommended for Hedera)
   - Browser extension and mobile app
   - Native Hedera support
   - Download: https://www.hashpack.app

2. **MetaMask** (EVM-compatible)
   - For EVM-based chains
   - Ethereum, Polygon, BSC support

3. **WalletConnect**
   - Universal wallet connection
   - 300+ wallets supported

### Connection Flow

**Desktop**:
```
User clicks "Connect Wallet" 
  → HashPack extension opens
  → User approves connection
  → Account connected ✅
```

**Mobile (In-App Browser)**:
```
User opens app in HashPack browser
  → Auto-detects HashPack
  → Auto-connects within 2-5 seconds
  → Account connected ✅
```

**Mobile (External Browser)**:
```
User clicks "Connect Wallet"
  → Deep link opens HashPack app
  → User approves in app
  → Returns to browser
  → Account connected ✅
```

---

## 🧪 Testing

### Test Send/Receive Functions

1. **Connect HashPack Wallet**:
   - Open http://localhost:3000
   - Click "Connect Wallet" → "Hedera Wallet"
   - Approve connection in HashPack

2. **Test Receive**:
   - Go to Wallet page
   - Click "Receive"
   - See your Account ID with QR code
   - Copy address or scan QR

3. **Test Send** (Requires 2 accounts):
   - Click "Send Money"
   - Enter recipient Account ID
   - Enter amount (e.g., 10 BPUSD)
   - Click "Send Now"
   - Approve in HashPack
   - View transaction on HashScan

### Create Test Account

**Option 1: HashPack App**
- Download HashPack mobile/extension
- Create new wallet
- Switch to Testnet
- Request testnet HBAR from faucet

**Option 2: Hedera Portal**
- Visit https://portal.hedera.com
- Create testnet account
- Get free 10,000 HBAR

---

## 🔍 Useful Links

- **Hedera Documentation**: https://docs.hedera.com
- **HashPack Wallet**: https://www.hashpack.app
- **Hedera Portal**: https://portal.hedera.com
- **HashScan Explorer (Testnet)**: https://hashscan.io/testnet
- **Mirror Node API**: https://testnet.mirrornode.hedera.com
- **WalletConnect Cloud**: https://cloud.walletconnect.com
- **Hedera Discord**: https://hedera.com/discord

### Your Specific Links

- **Your Account**: https://hashscan.io/testnet/account/0.0.4826582
- **Your BPUSD Token**: https://hashscan.io/testnet/token/0.0.7167755
- **Testnet Faucet**: https://portal.hedera.com (10,000 free HBAR)

---

## 🐛 Troubleshooting

### Wallet Won't Connect

**Solution**:
- Ensure HashPack is installed and unlocked
- Check network is set to Testnet
- Refresh page and try again
- Check browser console for errors

### Transaction Fails

**Common Issues**:
- Insufficient HBAR for fees (need ~$0.01 worth)
- Token not associated (run `npm run hedera:associate`)
- Recipient hasn't associated token
- Invalid Account ID format

### "INVALID_SIGNATURE" Error

**Solution**:
- Verify private key format in `.env.local`
- Ensure key matches Account ID
- Check key type (ECDSA vs ED25519)

### Token Not Showing in Wallet

**Solution**:
- Associate token first: `npm run hedera:associate`
- Or in HashPack: Tokens → Associate → Enter Token ID

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Bode Favour**
- GitHub: [@bodefavour](https://github.com/bodefavour)
- Hedera Account: 0.0.4826582

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💡 Support

For support, email bodefavour@example.com or open an issue on GitHub.

---

**Built with ❤️ using Hedera Hashgraph**
