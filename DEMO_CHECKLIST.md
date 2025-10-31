# O3 Demo Video - Quick Checklist

## Pre-Recording Setup ✅

### 1. Environment Variables
```bash
- [ ] NEXT_PUBLIC_HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT
- [ ] NEXT_PUBLIC_HEDERA_OPERATOR_KEY=302...
- [ ] NEXT_PUBLIC_DEV_BYPASS_ACCOUNT=0.0.YOUR_ACCOUNT
- [ ] HEDERA_NETWORK=testnet
- [ ] DATABASE_URL=postgresql://...
```

### 2. Account Funding
```bash
- [ ] Testnet account has at least 50 HBAR
- [ ] Get HBAR from: https://portal.hedera.com/faucet
- [ ] Verify balance on HashScan
```

### 3. Application Setup
```bash
- [ ] npm install (dependencies installed)
- [ ] npm run dev (app running on localhost:3000)
- [ ] Database seeded with sample data
- [ ] No console errors
```

---

## Recording Checklist 🎥

### Scene 1: Dashboard (30s)
```
- [ ] Navigate to /dashboard
- [ ] Show balance cards
- [ ] Scroll through recent transactions
- [ ] Click transaction hash → HashScan opens
```

### Scene 2: Send Transaction (60s)
```
- [ ] Click "Send" button
- [ ] Enter recipient: 0.0.1234567
- [ ] Enter amount: 10 HBAR
- [ ] Select priority: Instant
- [ ] Add memo: "Demo payment"
- [ ] Review transaction
- [ ] Confirm and execute
- [ ] Show success screen with explorer link
- [ ] Click link to verify on HashScan
```

### Scene 3: Receive Payment (30s)
```
- [ ] Click "Receive" button
- [ ] Show QR code
- [ ] Copy wallet address
- [ ] Enter request amount: 25 HBAR
- [ ] Add note: "Invoice payment"
- [ ] Demo share buttons
```

### Scene 4: Additional Features (45s)
```
Invoicing:
- [ ] Navigate to /invoicing
- [ ] Filter by "Pending"
- [ ] Show invoice list
- [ ] Display stats

Payroll:
- [ ] Navigate to /payroll
- [ ] Filter by department
- [ ] Show employee list

Wallet:
- [ ] Navigate to /wallet
- [ ] Show full transaction history
- [ ] Open Swap modal (UI only)
```

### Scene 5: Blockchain Verification (30s)
```
- [ ] Click recent transaction hash
- [ ] Show HashScan details:
  - Transaction ID
  - Sender/Receiver
  - Amount
  - Timestamp
- [ ] Highlight "Verified on Hedera Testnet"
```

---

## Features That Work ✅

| Feature | Status |
|---------|--------|
| ✅ Send HBAR | FULLY FUNCTIONAL |
| ✅ Receive Request | FULLY FUNCTIONAL |
| ✅ Transaction History | FULLY FUNCTIONAL |
| ✅ Balance Display | FULLY FUNCTIONAL |
| ✅ Invoicing UI | FULLY FUNCTIONAL |
| ✅ Payroll UI | FULLY FUNCTIONAL |
| ⚠️ Swap UI | MOCK ONLY (show UI only) |

---

## Key Talking Points 🎤

1. **"Blockchain-powered payments on Hedera"**
2. **"Sub-second transaction finality"**
3. **"All transactions verified on public ledger"**
4. **"Enterprise invoicing and payroll"**
5. **"Multi-currency support"**
6. **"Transaction fees under $0.01"**
7. **"Built with Next.js and Hedera SDK"**

---

## Test Accounts

### Your Account (Operator)
```
Account ID: [Your NEXT_PUBLIC_HEDERA_OPERATOR_ID]
Use this for: Sending, Receiving, Balance display
```

### Test Recipient
```
Account ID: 0.0.1234567 (or any valid testnet account)
Use this for: Send transaction demos
```

---

## HashScan Links 🔗

```
Your Account:
https://hashscan.io/testnet/account/[YOUR_ACCOUNT_ID]

After Transaction:
https://hashscan.io/testnet/transaction/[TRANSACTION_ID]
```

---

## Troubleshooting 🔧

### If Send Fails:
- Check HBAR balance (need at least 10 HBAR)
- Verify HEDERA_NETWORK=testnet
- Check operator key is correct

### If Receive Shows Wrong Address:
- Verify NEXT_PUBLIC_DEV_BYPASS_ACCOUNT is set
- Clear localStorage and refresh

### If No Transactions Show:
- Check DATABASE_URL is connected
- Run database seed script
- Verify API routes are working

---

## Recording Tips 💡

1. **Close unnecessary tabs** (clean browser)
2. **Use incognito/private window** (fresh state)
3. **Prepare sample data** (invoices, employees)
4. **Have HashScan open** in another tab for quick verification
5. **Test the full flow once** before recording
6. **Record in HD** (1080p minimum)
7. **Use smooth mouse movements**
8. **Highlight key features** with cursor

---

## Post-Recording ✂️

- [ ] Edit out any loading delays
- [ ] Add background music
- [ ] Add text overlays for key features
- [ ] Include your contact/GitHub link
- [ ] Add captions/subtitles
- [ ] Export in high quality

---

## Backup Plan 🔄

If something breaks during recording:

1. **Have HashScan tab ready** - can show previous transactions
2. **Take screenshots** of working features beforehand
3. **Record in segments** - easier to edit
4. **Keep test account funded** - avoid balance issues
5. **Test everything once** before final recording

---

## Target Demo Length 🎬

- **Minimum**: 2 minutes (core features only)
- **Ideal**: 3 minutes (with invoicing/payroll)
- **Maximum**: 5 minutes (with explanations)

---

## Good Luck! 🚀

Remember: You have a **fully functional blockchain payment platform**. Focus on showing real transactions and professional UI/UX.
