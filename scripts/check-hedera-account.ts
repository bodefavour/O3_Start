/**
 * Script to check Hedera testnet account balance
 * Run: npx tsx scripts/check-hedera-account.ts
 */

import { Client, AccountBalanceQuery, AccountId } from '@hashgraph/sdk';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
    console.log('🔍 Checking Hedera Testnet Account...\n');

    const operatorId = process.env.HEDERA_OPERATOR_ID;

    if (!operatorId) {
        console.error('❌ HEDERA_OPERATOR_ID not found in environment variables');
        process.exit(1);
    }

    try {
        const client = Client.forTestnet();

        const accountId = AccountId.fromString(operatorId);
        const balance = await new AccountBalanceQuery()
            .setAccountId(accountId)
            .execute(client);

        console.log('✅ Account Found!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`Account ID: ${operatorId}`);
        console.log(`HBAR Balance: ${balance.hbars.toString()}`);
        console.log(`Mirror Node: https://hashscan.io/testnet/account/${operatorId}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Check if account has tokens
        if (balance.tokens && balance.tokens.size > 0) {
            console.log('💰 Token Balances:');
            for (const [tokenId, tokenBalance] of balance.tokens) {
                console.log(`  ${tokenId.toString()}: ${tokenBalance.toString()}`);
            }
            console.log('');
        } else {
            console.log('📝 No tokens associated with this account yet.\n');
        }

        // Check if account has enough HBAR
        const hbarBalance = parseFloat(balance.hbars.toString());
        if (hbarBalance < 5) {
            console.log('⚠️  Low HBAR balance! You need HBAR to pay for transaction fees.');
            console.log('\n💡 Get free testnet HBAR:');
            console.log('   1. Go to: https://portal.hedera.com/');
            console.log('   2. Sign in with Google/GitHub');
            console.log('   3. Navigate to "Testnet" → "Faucet"');
            console.log(`   4. Enter your account ID: ${operatorId}`);
            console.log('   5. Click "Receive HBAR" (you\'ll get 10,000 HBAR)\n');
        } else {
            console.log('✅ Account has sufficient HBAR for transactions!\n');
            console.log('🎉 You\'re ready to create tokens and make transfers!\n');
        }

        client.close();
    } catch (error: any) {
        console.error('\n❌ Error:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Make sure your account ID is valid');
        console.error('2. Check your internet connection');
        console.error('3. Verify the account exists on Hedera testnet\n');
        process.exit(1);
    }
}

main();
