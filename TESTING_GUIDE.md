# 🧪 Hedera Testnet Testing Guide

## Quick Start: Test Your Transaction

### Problem
You tried to send to account `0.0.10074221` which doesn't exist on testnet.

### Solution Options

#### Option 1: Use Your Own Account (Easiest)
Send tokens to yourself to test:
```
Recipient: 0.0.4826582 (your operator account)
```
This will work immediately and you can verify the transaction!

#### Option 2: Create a New Testnet Account
1. Visit: https://portal.hedera.com/register
2. Create free testnet account
3. Copy the account ID (format: 0.0.XXXXXXX)
4. Use that as recipient

#### Option 3: Use Common Test Accounts
These are Hedera's official test accounts (always exist):
```
Hedera Treasury: 0.0.2
Hedera Fee Collection: 0.0.98
```

---

## For Hackathon Demo

### Best Practice: Use Your Operator Account
**Recommended for demo**:
```
From: 0.0.4826582 (your account)
To: 0.0.4826582 (same account)
Amount: 10 BPUSD
```

**Why this works**:
- ✅ No INVALID_ACCOUNT_ID error
- ✅ Transaction will succeed
- ✅ Shows real blockchain activity
- ✅ Verifiable on HashScan
- ✅ Can see TX hash on Mirror Node

---

## Testing Steps

### 1. Fund Your Account First
```bash
Visit: https://portal.hedera.com/faucet
Enter: 0.0.4826582
Request: 10,000 HBAR
Wait: 30 seconds
```

### 2. Associate Token (One-Time Setup)
Before receiving tokens, your account must associate with the token.

Run this script:
```bash
node scripts/associate-token.js
```

Or use the test page:
```
Visit: http://localhost:3000/test-backend-signing
Click: "Associate Token" button
```

### 3. Send Test Transaction
```
1. Go to /dashboard
2. Click "Send"
3. Enter recipient: 0.0.4826582
4. Enter amount: 10
5. Add memo: "Hackathon test"
6. Click Send
```

### 4. Verify on Blockchain
```
1. Click the transaction hash link
2. Opens HashScan explorer
3. Verify:
   - Status: Success
   - From: 0.0.4826582
   - To: 0.0.4826582
   - Token: 0.0.7167755 (BPUSD)
   - Amount: 10.00
```

---

## Common Errors & Solutions

### Error: INVALID_ACCOUNT_ID
**Problem**: Recipient account doesn't exist
**Solution**: Use your own account (0.0.4826582) or create new testnet account

### Error: TOKEN_NOT_ASSOCIATED_TO_ACCOUNT
**Problem**: Recipient hasn't associated the token
**Solution**: Associate token first (see step 2 above)

### Error: INSUFFICIENT_PAYER_BALANCE
**Problem**: Not enough HBAR for transaction fees
**Solution**: Get HBAR from faucet (see step 1 above)

### Error: INSUFFICIENT_TOKEN_BALANCE
**Problem**: Don't have enough tokens
**Solution**: Mint more tokens or use smaller amount

---

## For Video Demo

### Scene: Send Transaction

**Setup**:
```
From: 0.0.4826582
To: 0.0.4826582 (sending to yourself!)
Amount: 10 BPUSD
Memo: "BorderlessPay demo transaction"
```

**Demo Flow**:
1. "I'll send 10 BPUSD tokens using our platform"
2. Enter your own account as recipient
3. "Notice: no wallet popup needed!"
4. Click Send
5. "Transaction executed in under 3 seconds"
6. Click HashScan link
7. "Here's proof on the public Hedera blockchain"
8. Point to:
   - Transaction ID
   - Consensus timestamp
   - Token transfer details
   - Success status

**Key Talking Points**:
- "Real blockchain transaction"
- "Verified on public ledger"
- "Sub-second finality"
- "Transaction cost: $0.001"
- "Anyone can verify on Mirror Node"

---

## Token Association Script

Create: `scripts/associate-token.js`

```javascript
const { Client, TokenAssociateTransaction, PrivateKey, AccountId } = require("@hashgraph/sdk");

async function main() {
    const operatorId = process.env.HEDERA_OPERATOR_ID;
    const operatorKey = process.env.HEDERA_OPERATOR_KEY;
    const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    console.log(`Associating token ${tokenId} with account ${operatorId}...`);

    try {
        const transaction = await new TokenAssociateTransaction()
            .setAccountId(operatorId)
            .setTokenIds([tokenId])
            .freezeWith(client);

        const signTx = await transaction.sign(PrivateKey.fromString(operatorKey));
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);

        console.log("✅ Token associated successfully!");
        console.log("Transaction ID:", txResponse.transactionId.toString());
        console.log("Status:", receipt.status.toString());
    } catch (error) {
        if (error.message.includes("TOKEN_ALREADY_ASSOCIATED")) {
            console.log("✅ Token already associated!");
        } else {
            console.error("❌ Error:", error.message);
        }
    }

    client.close();
}

main();
```

Run with:
```bash
node scripts/associate-token.js
```

---

## Verification Links

### Your Account
```
HashScan: https://hashscan.io/testnet/account/0.0.4826582
Mirror Node: https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.4826582
```

### Your Token
```
Token: 0.0.7167755 (BPUSD)
HashScan: https://hashscan.io/testnet/token/0.0.7167755
Mirror Node: https://testnet.mirrornode.hedera.com/api/v1/tokens/0.0.7167755
```

### Check Token Balance
```
Mirror Node API:
https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.4826582/tokens?token.id=0.0.7167755
```

---

## Quick Test Commands

### Check HBAR Balance
```bash
curl "https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.4826582"
```

### Check Token Association
```bash
curl "https://testnet.mirrornode.hedera.com/api/v1/accounts/0.0.4826582/tokens"
```

### Get Recent Transactions
```bash
curl "https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=0.0.4826582&limit=5"
```

---

## Success Checklist

Before recording demo:
- [ ] Account has HBAR (>100)
- [ ] Token is associated
- [ ] Test transaction works
- [ ] HashScan link opens
- [ ] Mirror Node shows data
- [ ] Browser cache cleared
- [ ] No console errors

---

## Ready to Demo! 🚀

Use recipient: **0.0.4826582** (your own account)
This guarantees the transaction will work!
