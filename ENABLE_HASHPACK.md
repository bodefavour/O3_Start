# Enable HashPack Wallet Connection

The HashPack wallet option is currently disabled to prevent WalletConnect errors during development.

## Why is it disabled?

HashPack wallet uses WalletConnect protocol which requires a Project ID from WalletConnect Cloud. Without this ID, you'll see errors like:
- `Failed to publish custom payload`
- `WebSocket connection to 'wss://relay.walletconnect.org/' failed`
- `MaxListenersExceededWarning: Possible EventEmitter memory leak`

## How to Enable HashPack Wallet

### Step 1: Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Sign up for free account
3. Create a new project
4. Copy your Project ID (looks like: `08c4b07e3ad25f1a27c14a4e8cecb6f0`)

### Step 2: Update Environment Variables

Add to your `.env` file:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here
```

### Step 3: Uncomment HashPack in signin-form.tsx

In `src/components/thirdweb/signin-form.tsx`, find both wallet arrays and uncomment:

```typescript
// Before:
const wallets = [
  inAppWallet({ ... }),
  createWallet("io.metamask"),
  // createWallet("com.hashpack.wallet"),  // <- Commented out
];

// After:
const wallets = [
  inAppWallet({ ... }),
  createWallet("io.metamask"),
  createWallet("com.hashpack.wallet"),  // <- Uncommented
];
```

There are TWO places to update:
1. In the `SignInButton` component (around line 48)
2. In the `SignInForm` component (around line 131)

### Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 5: Test HashPack Connection

1. Install [HashPack Chrome Extension](https://www.hashpack.app/)
2. Create/import wallet in HashPack
3. Switch HashPack to Testnet
4. Click "Connect Wallet" in your app
5. Select "HashPack"
6. Approve connection in HashPack extension

## Alternative: Use Email/Google Login

For quick demos and development, you can use the built-in authentication options:
- ✅ Email (no wallet needed)
- ✅ Google (no wallet needed)
- ✅ MetaMask (if installed)
- ✅ Passkey (biometric authentication)

These work immediately without any additional setup!

## For Hedera Transactions

Even without HashPack wallet connection, you can still demo Hedera transactions by:

1. Using the `HederaAccountInput` component (in `src/components/hedera/HederaAccountInput.tsx`)
2. Users manually enter their Hedera Account ID (0.0.xxxxx)
3. Backend uses operator account to execute transactions
4. Perfect for hackathon demos!

## Troubleshooting

**Error: "Failed to publish custom payload"**
- Make sure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly
- Restart dev server after adding env variable
- Clear browser cache and try again

**Error: "WebSocket connection failed"**
- Check your internet connection
- Verify WalletConnect Project ID is valid
- Try using a VPN if WalletConnect is blocked in your region

**Error: "MaxListenersExceededWarning"**
- This happens when HashPack tries to connect multiple times
- Make sure you only have one connect button on the page
- Refresh the page to clear old connection attempts
