const { Client, TokenAssociateTransaction, PrivateKey } = require("@hashgraph/sdk");

require('dotenv').config({ path: '.env.local' });

async function associateToken() {
    const operatorId = process.env.HEDERA_OPERATOR_ID || process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID;
    const operatorKey = process.env.HEDERA_OPERATOR_KEY || process.env.NEXT_PUBLIC_HEDERA_OPERATOR_KEY;
    const tokenId = process.env.NEXT_PUBLIC_HEDERA_TOKEN_ID;

    if (!operatorId || !operatorKey || !tokenId) {
        console.error("❌ Missing environment variables!");
        console.log("Required: HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY, NEXT_PUBLIC_HEDERA_TOKEN_ID");
        process.exit(1);
    }

    console.log("🔧 Associating token with account...");
    console.log("Account:", operatorId);
    console.log("Token:", tokenId);

    const client = Client.forTestnet();

    // Handle hex-encoded private key
    const keyString = operatorKey.startsWith('0x') ? operatorKey.slice(2) : operatorKey;
    let privKey;

    try {
        privKey = PrivateKey.fromStringECDSA(keyString);
    } catch {
        try {
            privKey = PrivateKey.fromStringED25519(keyString);
        } catch {
            privKey = PrivateKey.fromString(operatorKey);
        }
    }

    client.setOperator(operatorId, privKey);

    try {
        const transaction = await new TokenAssociateTransaction()
            .setAccountId(operatorId)
            .setTokenIds([tokenId])
            .freezeWith(client);

        const signTx = await transaction.sign(privKey);
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);

        console.log("\n✅ Token associated successfully!");
        console.log("Transaction ID:", txResponse.transactionId.toString());
        console.log("Status:", receipt.status.toString());
        console.log("\n🔗 View on HashScan:");
        console.log(`https://hashscan.io/testnet/transaction/${txResponse.transactionId.toString()}`);
        console.log("\n💰 Check your token balance:");
        console.log(`https://hashscan.io/testnet/account/${operatorId}`);

    } catch (error) {
        if (error.message && error.message.includes("TOKEN_ALREADY_ASSOCIATED")) {
            console.log("\n✅ Token already associated with this account!");
            console.log("\n💰 Check your token balance:");
            console.log(`https://hashscan.io/testnet/account/${operatorId}`);
        } else {
            console.error("\n❌ Error associating token:", error.message);
            console.log("\n📝 Common issues:");
            console.log("1. Make sure account has HBAR for transaction fees");
            console.log("2. Verify token ID is correct");
            console.log("3. Check network (testnet vs mainnet)");
        }
    } finally {
        client.close();
    }
}

associateToken();
