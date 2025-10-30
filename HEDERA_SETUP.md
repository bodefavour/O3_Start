# Hedera Integration Setup Guide

## 🎯 Hackathon Deliverables - Implementation Complete

✅ **Working MVP with Hedera Integration**
- Hedera-native stablecoin (HTS token) creation
- Wallet functions: send/receive stablecoin
- Conversion workflow (with mock rates)
- View TX hash on Hedera Mirror Node

---

## 📋 Prerequisites

1. **Hedera Testnet Account**
   - Go to [Hedera Portal](https://portal.hedera.com)
   - Create a testnet account
   - Save your Account ID (format: 0.0.xxxxx) and Private Key

2. **HashPack Wallet** (for users)
   - Install [HashPack Chrome Extension](https://www.hashpack.app/)
   - Create wallet and switch to Testnet
   - Fund with testnet HBAR from [Hedera Faucet](https://portal.hedera.com/faucet)

3. **WalletConnect Project ID** (optional, for HashConnect)
   - Get free ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

---

## 🚀 Quick Start

### Step 1: Configure Environment Variables

Update your `.env` file with your Hedera credentials:

```bash
# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY_HERE
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
```

### Step 2: Create Demo Stablecoin Token

Run this command to create your BorderlessPay USD (BPUSD) token:

```bash
curl -X POST http://localhost:3000/api/hedera/create-token \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BorderlessPay USD",
    "symbol": "BPUSD",
    "decimals": 2,
    "initialSupply": 1000000
  }'
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "tokenId": "0.0.123456",
    "transactionId": "0.0.12345@1234567890.123456789",
    "name": "BorderlessPay USD",
    "symbol": "BPUSD",
    "decimals": 2,
    "initialSupply": 1000000,
    "explorerUrl": "https://hashscan.io/testnet/token/0.0.123456"
  }
}
```

### Step 3: Update Token ID

Add the token ID to your `.env`:

```bash
NEXT_PUBLIC_HEDERA_TOKEN_ID=0.0.123456  # Use your actual token ID
```

### Step 4: Fund Test Accounts

Transfer some BPUSD tokens to test accounts:

```bash
curl -X POST http://localhost:3000/api/hedera/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "tokenId": "0.0.123456",
    "fromAccountId": "0.0.YOUR_OPERATOR_ID",
    "toAccountId": "0.0.RECIPIENT_ID",
    "amount": 100,
    "memo": "Demo funding"
  }'
```

### Step 5: Test the Application

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open http://localhost:3000**

3. **Sign in and navigate to Wallet page**

4. **Send tokens:**
   - Click "Send Money"
   - Enter recipient Hedera Account ID (0.0.xxxxx)
   - Enter amount
   - Click "Send Now"
   - View transaction on HashScan!

---

## 🔧 Features Implemented

### 1. Hedera Token Service (`src/lib/web3/hedera-token.ts`)
- ✅ `createStablecoin()` - Create HTS fungible token
- ✅ `transferToken()` - Transfer tokens between accounts
- ✅ `getTokenBalance()` - Query account token balance
- ✅ `associateToken()` - Associate token with account
- ✅ `mintTokens()` - Mint additional supply
- ✅ `getTokenInfo()` - Query token metadata from Mirror Node
- ✅ `getTransactionInfo()` - Query transaction from Mirror Node
- ✅ `getExplorerUrl()` - Generate HashScan link

### 2. HashConnect Integration (`src/lib/web3/hashconnect.ts`)
- ✅ `initHashConnect()` - Connect to HashPack wallet
- ✅ `sendTransaction()` - Sign transactions with HashPack
- ✅ `getConnectedAccountId()` - Get user's Hedera account ID
- ✅ `disconnectHashPack()` - Disconnect wallet

### 3. API Endpoints
- ✅ `POST /api/hedera/create-token` - Create new HTS token
- ✅ `POST /api/hedera/transfer` - Transfer tokens with real Hedera TX

### 4. UI Components
- ✅ `TransactionLink` - Clickable link to HashScan + Mirror Node
- ✅ `TransactionStatusBadge` - Status badge with explorer link
- ✅ Updated `SendModal` - Real Hedera transactions with loading states

---

## 📊 Demo Flow

### For Hackathon Judges:

1. **Show Token Creation:**
   ```bash
   # Create BPUSD token
   POST /api/hedera/create-token
   
   # Show token on HashScan
   https://hashscan.io/testnet/token/0.0.YOUR_TOKEN_ID
   ```

2. **Demonstrate Send Transaction:**
   - Open wallet page
   - Click "Send Money"
   - Enter test account: `0.0.123456` (any testnet account)
   - Enter amount: `10.00 BPUSD`
   - Click "Send Now"
   - **Transaction appears with real Hedera TX ID**
   - **Click link to view on HashScan** ✨
   - **Click "Mirror Node API" to see JSON response**

3. **Show Receive Flow:**
   - Display Hedera Account ID (0.0.xxxxx format)
   - Show QR code with account ID
   - Copy account ID to clipboard

4. **Mock Conversion Workflow:**
   - Click "Swap" button
   - Show conversion rates (BPUSD → NGN, KES, etc.)
   - Mock swap interface (real swap would need DEX integration)

---

## 🎬 Hackathon Demo Script

**"Let me show you BorderlessPay's Hedera integration..."**

1. **Token Creation** (1 min)
   - "We created a Hedera-native stablecoin called BPUSD"
   - Show HashScan token page
   - "1 million supply, 2 decimals, infinite supply type"

2. **Send Transaction** (2 min)
   - "Users can send BPUSD to any Hedera account"
   - Demo send flow in UI
   - "Here's the real transaction ID from Hedera"
   - Click link → Opens HashScan
   - "You can see it's confirmed on the network"

3. **Mirror Node Integration** (1 min)
   - Click "Mirror Node API" link
   - Show JSON transaction data
   - "Full transparency - all data verifiable on-chain"

4. **Conversion Workflow** (1 min)
   - Show swap modal
   - "We support conversion to local African currencies"
   - "Rates are currently mocked, but structure is ready for real DEX"

---

## 🐛 Troubleshooting

### Error: "Hedera credentials not configured"
**Solution:** Make sure `HEDERA_OPERATOR_ID` and `HEDERA_OPERATOR_KEY` are set in `.env`

### Error: "Insufficient balance"
**Solution:** Fund your operator account with testnet HBAR from the faucet

### Error: "Token association required"
**Solution:** Recipient must associate the token first:
```bash
POST /api/hedera/associate-token
{
  "accountId": "0.0.RECIPIENT",
  "tokenId": "0.0.YOUR_TOKEN",
  "privateKey": "RECIPIENT_KEY"
}
```

### HashConnect not connecting
**Solution:** 
1. Make sure HashPack extension is installed
2. Switch HashPack to Testnet
3. Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set

---

## 📈 Production Considerations

For moving beyond hackathon:

1. **Token Association Flow**
   - Auto-detect if recipient needs token association
   - Guide users through association process
   - Handle association transaction fees

2. **Real Conversion Rates**
   - Integrate with DEX (SaucerSwap, Pangolin)
   - Implement slippage protection
   - Add liquidity pool integration

3. **HashPack Signing**
   - Currently using operator account for backend calls
   - Move to full HashPack wallet signing for user transactions
   - Implement transaction signing in SendModal

4. **Error Handling**
   - Better error messages for common failures
   - Retry logic for network issues
   - Transaction status polling

---

## 🎯 Deliverables Checklist

- ✅ Hedera-native stablecoin (BPUSD) created
- ✅ Send functionality with real Hedera TX
- ✅ Receive flow showing Hedera account ID
- ✅ Transaction hash clickable to HashScan
- ✅ Transaction visible on Mirror Node
- ✅ Conversion workflow UI (mock rates)
- ✅ Complete API endpoints
- ✅ Full TypeScript type safety
- ✅ Production-ready architecture

---

## 📚 Resources

- [Hedera Docs](https://docs.hedera.com)
- [HashPack Wallet](https://www.hashpack.app/)
- [HashScan Explorer](https://hashscan.io/testnet)
- [Hedera Portal (Testnet Faucet)](https://portal.hedera.com)
- [Mirror Node REST API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api)

---

**Built for hackathon by BorderlessPay team** 🚀
