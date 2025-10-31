/**
 * Script to associate BPUSD token with your account
 * Run: npx tsx scripts/associate-token.ts
 */

import { associateToken } from '../src/lib/web3/hedera-token';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
    const accountId = process.env.HEDERA_OPERATOR_ID;
    const privateKey = process.env.HEDERA_OPERATOR_KEY;
    const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

    if (!accountId || !privateKey || !tokenId) {
        console.error('❌ Missing environment variables');
        process.exit(1);
    }

    console.log('🔗 Associating BPUSD token with your account...\n');
    console.log(`Account: ${accountId}`);
    console.log(`Token: ${tokenId}\n`);

    try {
        const result = await associateToken(accountId, tokenId, privateKey);

        if (result.success) {
            console.log('✅ Token associated successfully!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`Transaction ID: ${result.transactionId}`);
            console.log(`Explorer: https://hashscan.io/testnet/transaction/${result.transactionId}`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            console.log('🎉 You can now send and receive BPUSD tokens!\n');
        } else {
            console.error(`❌ Association failed: ${result.error}`);

            if (result.error?.includes('TOKEN_ALREADY_ASSOCIATED')) {
                console.log('\n✅ Token is already associated with this account!');
                console.log('You\'re good to go! 🎉\n');
            }
        }
    } catch (error: any) {
        console.error('\n❌ Error:', error.message);
    }
}

main();
