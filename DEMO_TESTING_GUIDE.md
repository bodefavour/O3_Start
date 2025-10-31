# Demo Video Testing Guide

## Overview
This guide covers all features you can demonstrate in your O3 payment platform video, including Hedera blockchain integration that works **without HashPack wallet connection** using direct signing.

---

## Environment Setup

### Required Environment Variables
```bash
# Hedera Testnet Credentials (Required for Direct Signing)
NEXT_PUBLIC_HEDERA_OPERATOR_ID=0.0.YOUR_TESTNET_ACCOUNT
NEXT_PUBLIC_HEDERA_OPERATOR_KEY=your-private-key-here
HEDERA_NETWORK=testnet

# Dev Bypass (Use same as operator ID)
NEXT_PUBLIC_DEV_BYPASS_ACCOUNT=0.0.YOUR_TESTNET_ACCOUNT

# WalletConnect (Optional - not needed for demo)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### How It Works
- Setting `NEXT_PUBLIC_DEV_BYPASS_ACCOUNT` skips HashPack connection UI
- Transactions use your operator account via `direct-signer.ts`
- All modals (Send/Receive/Swap) will use your testnet account

---

## Feature Testing Checklist

### 🎯 **Core Wallet Features** (Dashboard & Wallet Pages)

#### ✅ **Send Transaction** - FULLY FUNCTIONAL
**Location**: Dashboard or `/wallet` page → "Send" button

**Test Steps**:
1. Click "Send" button
2. Enter recipient Hedera account ID (e.g., `0.0.1234567`)
3. Enter amount (e.g., `10` HBAR)
4. Select priority:
   - ⚡ Instant (0.001 HBAR fee)
   - 🕐 1 Hour (0.0005 HBAR fee)
   - ⏰ 6 Hours (0.0001 HBAR fee)
5. Add optional memo (e.g., "Test payment for demo")
6. Click "Review Transaction"
7. Review details and confirm
8. Transaction executes via **backend signing** (no wallet popup!)
9. Success screen shows:
   - Transaction hash
   - HashScan explorer link (clickable)
   - Mirror node link

**What to Demo**:
- Multi-step wizard UI (Details → Review → Success)
- Real-time balance validation
- Transaction executes without wallet interaction
- Click HashScan link to verify on blockchain

**Backend Details**:
- Uses `/api/hedera/transfer` route
- Signs with `NEXT_PUBLIC_HEDERA_OPERATOR_KEY`
- Stores transaction in PostgreSQL database
- Returns HashScan explorer URL

---

#### ✅ **Receive Payment Request** - FULLY FUNCTIONAL
**Location**: Dashboard or `/wallet` page → "Receive" button

**Test Steps**:
1. Click "Receive" button
2. QR code displays your operator account ID
3. Wallet address field shows your testnet account (e.g., `0.0.5170841`)
4. Click copy button to copy address
5. (Optional) Enter request amount (e.g., `25 HBAR`)
6. (Optional) Add note (e.g., "Payment for services")
7. Share via:
   - **Copy**: Copies full payment request
   - **Share**: Opens native share menu (mobile)
   - **Email**: Opens mail client with pre-filled message

**What to Demo**:
- QR code generation for easy scanning
- One-click address copy
- Payment request with amount and memo
- Multiple sharing options

**Notes**:
- QR code value is your Hedera account ID
- Recipients can scan QR or copy address to send payment
- Works perfectly with dev bypass account

---

#### ⚠️ **Swap Currencies** - MOCK UI ONLY
**Location**: Dashboard or `/wallet` page → "Swap" button

**Test Steps**:
1. Click "Swap" button
2. Select "From" currency (NGN, USDT, USDC, KES, GHS, HUSD)
3. Enter amount
4. Select "To" currency
5. View mock conversion rate
6. Click swap arrows to flip currencies
7. Adjust slippage tolerance (0.1%, 0.5%, 1.0%)
8. Click "Swap Now"
9. Success toast appears

**What to Demo**:
- Multi-currency selection
- Real-time conversion calculations (mock rates)
- Slippage tolerance settings
- Professional UI/UX

**Current Limitations**:
- ❌ No real blockchain swap execution
- ❌ Uses hardcoded mock exchange rates
- ❌ Just shows success toast (no actual transaction)

**Future Enhancement**:
Could integrate with:
- SaucerSwap (Hedera DEX)
- HashPort (cross-chain bridge)
- Custom token swap contracts

---

### 📊 **Dashboard Overview**

#### Account Summary Cards
**Test Steps**:
1. Navigate to `/dashboard`
2. View balance cards showing:
   - Total Balance (from database wallets)
   - Monthly Volume (sum of transactions this month)
   - Transaction Count (last 30 days)
   - Pending Invoices

**What to Demo**:
- Real-time balance display
- Financial metrics calculation
- Responsive card layout

**Data Source**:
- Fetches from `/api/wallets` and `/api/transactions`
- Stores in PostgreSQL via Drizzle ORM

---

#### Recent Transactions List
**Test Steps**:
1. Scroll down to "Recent Transactions"
2. View transaction history with:
   - Type (Incoming/Outgoing/Swap)
   - Amount and currency
   - Timestamp
   - Status (Completed/Pending/Failed)
   - Transaction hash

**What to Demo**:
- Chronological transaction feed
- Color-coded transaction types
- Clickable transaction hashes
- Time ago formatting

**Notes**:
- After sending via SendModal, new transactions appear here
- Fetched from `/api/transactions` route

---

### 💼 **Invoicing System** (`/invoicing`)

#### Features to Demo:
1. Navigate to `/invoicing`
2. View invoice list with columns:
   - Invoice Number (e.g., INV-001)
   - Client Name
   - Amount
   - Status (Pending/Paid/Overdue)
   - Issue Date / Due Date
3. Filter by status: All, Pending, Paid, Overdue
4. Search invoices by number, client, or description
5. View summary stats:
   - Total Outstanding
   - Paid This Month
   - Overdue Amount

**What to Demo**:
- Professional invoice management UI
- Advanced filtering and search
- Financial dashboard for businesses

**Current State**:
- ✅ Full CRUD operations via `/api/invoices`
- ✅ Database-backed (PostgreSQL)
- ❌ No Hedera payment integration yet
- ❌ "Pay Invoice" button not connected to blockchain

**Future Enhancement**:
- Add "Pay with HBAR" button that opens SendModal
- Link invoice payment to Hedera transaction
- Auto-update invoice status when payment confirmed

---

### 👥 **Payroll Management** (`/payroll`)

#### Features to Demo:
1. Navigate to `/payroll`
2. View employee list with:
   - Employee Name
   - Position
   - Department
   - Salary
   - Status (Active/Inactive)
3. Filter by department
4. Search employees
5. View payroll summary:
   - Total Monthly Payroll
   - Employee Count
   - Department Breakdown

**What to Demo**:
- HR/Payroll management interface
- Department-based organization
- Salary tracking

**Current State**:
- ✅ Employee database via `/api/employees`
- ✅ Search and filter functionality
- ❌ No mass payment feature yet
- ❌ No Hedera batch transfer

**Future Enhancement**:
- Add "Pay All" button for batch HBAR transfers
- Schedule recurring payments
- Export payroll reports

---

### 💳 **Payments Page** (`/payments`)

#### Features to Demo:
1. Navigate to `/payments`
2. Toggle payment method:
   - **Card Payment** (traditional)
   - **Crypto Payment** (blockchain)
3. View payment form fields
4. Select plan/amount
5. Enter payment details

**What to Demo**:
- Hybrid payment options (fiat + crypto)
- Modern payment UI
- Payment method toggle

**Current State**:
- ✅ UI/UX complete
- ❌ Not integrated with Hedera
- ❌ Just a static form (no processing)

**Notes**:
- This is a generic payment page template
- Could be adapted for invoice/subscription payments
- Crypto option could open SendModal

---

## Testing Flow for Video Demo

### 🎬 **Recommended Recording Script**

#### **Scene 1: Dashboard Overview** (30 seconds)
1. Show login/authentication
2. Navigate to Dashboard
3. Highlight balance cards
4. Scroll through recent transactions
5. Click transaction hash → HashScan opens (show blockchain verification)

#### **Scene 2: Send Transaction** (60 seconds)
1. Click "Send" button
2. Enter recipient: `0.0.1234567`
3. Enter amount: `10 HBAR`
4. Select "Instant" priority
5. Add memo: "Demo payment for O3 platform"
6. Click Review → Show review screen
7. Confirm transaction
8. Success screen with explorer link
9. Click explorer link → Show HashScan transaction details

#### **Scene 3: Receive Payment** (30 seconds)
1. Click "Receive" button
2. Show QR code
3. Click copy address
4. Enter request amount: `25 HBAR`
5. Add note: "Invoice payment"
6. Click Share/Email buttons
7. Show payment request format

#### **Scene 4: Additional Features** (45 seconds)
1. Navigate to `/invoicing`
   - Filter by "Pending"
   - Search for invoice
   - Show stats summary
2. Navigate to `/payroll`
   - Filter by department
   - Show employee list
   - Display salary totals
3. Navigate to `/wallet`
   - Show full transaction history
   - Test Swap modal (UI only)

#### **Scene 5: Blockchain Verification** (30 seconds)
1. Return to Dashboard
2. Click recent transaction hash
3. Show HashScan page:
   - Transaction ID
   - Sender/Receiver accounts
   - Amount transferred
   - Timestamp
   - Consensus timestamp
4. Highlight "Verified on Hedera Testnet"

**Total Demo Length**: ~3 minutes

---

## Troubleshooting

### Issue: "Insufficient balance" error
**Solution**: Fund your testnet account at https://portal.hedera.com/faucet

### Issue: Receive modal not showing account ID
**Solution**: Check that `NEXT_PUBLIC_DEV_BYPASS_ACCOUNT` is set in `.env.local`

### Issue: SendModal falls back to backend API
**Expected**: This is correct! You're using direct signing (operator key)

### Issue: Transaction not appearing in HashScan
**Solution**: 
- Wait 3-5 seconds (testnet latency)
- Verify `HEDERA_NETWORK=testnet` in environment
- Check operator account has HBAR balance

### Issue: Swap modal doesn't execute transaction
**Expected**: Swap is mock UI only - just show the interface in video

---

## Environment Variable Checklist

Before recording, verify all required variables are set:

```bash
# Check your .env.local file contains:
✅ NEXT_PUBLIC_HEDERA_OPERATOR_ID
✅ NEXT_PUBLIC_HEDERA_OPERATOR_KEY
✅ NEXT_PUBLIC_DEV_BYPASS_ACCOUNT (same as operator ID)
✅ HEDERA_NETWORK=testnet
✅ DATABASE_URL (for transactions/invoices/payroll)
```

Run this command to verify:
```bash
npm run dev
# Should start without errors
```

---

## Additional Resources

### Hedera Testnet Links
- **Faucet**: https://portal.hedera.com/faucet
- **HashScan Explorer**: https://hashscan.io/testnet
- **Account Setup**: https://portal.hedera.com/

### Transaction Verification
After each send transaction, verify on HashScan:
1. Copy transaction ID from success modal
2. Go to: `https://hashscan.io/testnet/transaction/{TRANSACTION_ID}`
3. Confirm:
   - Status: Success
   - Type: CRYPTOTRANSFER
   - Sender: Your operator account
   - Receiver: Target account
   - Amount: Correct HBAR amount

---

## Features Summary

| Feature | Status | Blockchain Integration | Demo-Ready |
|---------|--------|----------------------|------------|
| Send Transaction | ✅ Working | ✅ Hedera SDK | ✅ Yes |
| Receive Request | ✅ Working | ✅ Account ID | ✅ Yes |
| Swap UI | ✅ Working | ❌ Mock only | ⚠️ UI only |
| Transaction History | ✅ Working | ✅ Database | ✅ Yes |
| Balance Display | ✅ Working | ✅ Database | ✅ Yes |
| Invoicing | ✅ Working | ❌ Not integrated | ✅ Yes |
| Payroll | ✅ Working | ❌ Not integrated | ✅ Yes |
| Payments Page | ✅ Working | ❌ Not integrated | ⚠️ Static |

**Legend**:
- ✅ = Fully functional
- ⚠️ = Partial/UI only
- ❌ = Not implemented

---

## Next Steps After Demo

### Priority 1: Enhance Swap Functionality
- Integrate with SaucerSwap DEX API
- Implement token swap via Hedera SDK
- Add real-time price feeds

### Priority 2: Invoice Payment Integration
- Add "Pay with HBAR" button on invoices
- Link invoice payment to SendModal
- Auto-update invoice status on blockchain confirmation

### Priority 3: Payroll Batch Payments
- Implement batch transfer functionality
- Schedule recurring payments
- Add employee wallet management

### Priority 4: Fix HashPack Integration
- Debug "Failed to publish custom payload" error
- Add extension detection fallback
- Implement QR-based mobile connection

---

## Demo Video Talking Points

Use these key points in your narration:

1. **"O3 is a blockchain-powered payment platform built on Hedera"**
2. **"Instant HBAR transfers with sub-second finality"**
3. **"All transactions verified on the Hedera public ledger"**
4. **"Enterprise-grade invoicing and payroll management"**
5. **"Multi-currency support for global businesses"**
6. **"Secure, transparent, and cost-effective (fees under $0.01)"**
7. **"Built with Next.js, TypeScript, and the Hedera SDK"**
8. **"Production-ready with PostgreSQL database and API routes"**

---

## Good Luck! 🚀

Your app is fully functional for demo purposes. Focus on highlighting:
- ✅ Real blockchain transactions (Send feature)
- ✅ Professional UI/UX design
- ✅ Enterprise features (invoicing, payroll)
- ✅ Transaction verification on HashScan

The direct signing workaround means you can record a polished demo without fighting with HashPack connection issues.
