/**
 * Script to create BorderlessPay USD (BPUSD) stablecoin on Hedera Testnet
 * Run: npx tsx scripts/create-hedera-token.ts
 */

import { createStablecoin } from '../src/lib/web3/hedera-token';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
    console.log('🚀 Creating BorderlessPay USD (BPUSD) token on Hedera Testnet...\n');

    try {
        const result = await createStablecoin(
            'BorderlessPay USD',
            'BPUSD',
            2, // 2 decimals (like real USD)
            1000000 // Initial supply: 1,000,000 BPUSD
        );

        console.log('\n✅ Token created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Token ID: ${result.tokenId}`);
        console.log(`Transaction ID: ${result.transactionId}`);
        console.log(`Explorer: https://hashscan.io/testnet/token/${result.tokenId}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('📝 Add this to your .env.local file:');
        console.log(`NEXT_PUBLIC_HEDERA_TOKEN_ID=${result.tokenId}\n`);
        
        console.log('💡 Next steps:');
        console.log('1. Copy the token ID above and add it to .env.local');
        console.log('2. Restart your dev server (npm run dev)');
        console.log('3. Connect your HashPack wallet');
        console.log('4. You can now send/receive BPUSD tokens!\n');
    } catch (error: any) {
        console.error('\n❌ Error creating token:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Make sure HEDERA_OPERATOR_ID and HEDERA_OPERATOR_KEY are set in .env.local');
        console.error('2. Ensure your testnet account has HBAR (get free testnet HBAR from portal.hedera.com)');
        console.error('3. Check that your private key is correct\n');
        process.exit(1);
    }
}

main();
