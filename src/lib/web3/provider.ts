import {
  Client,
  AccountId,
  PrivateKey,
  Hbar,
  AccountBalanceQuery,
  TransferTransaction,
  ContractExecuteTransaction,
  ContractCallQuery,
  ContractFunctionParameters,
} from '@hashgraph/sdk';

export function getHederaClient(): Client {
  const network = process.env.HEDERA_NETWORK || 'testnet';
  const operatorId = process.env.HEDERA_OPERATOR_ID;
  const operatorKey = process.env.HEDERA_OPERATOR_KEY;

  if (!operatorId || !operatorKey) {
    throw new Error('Hedera credentials not configured');
  }

  let client: Client;
  if (network === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }

  client.setOperator(
    AccountId.fromString(operatorId),
    PrivateKey.fromString(operatorKey)
  );

  return client;
}

export async function getAccountBalance(accountId: string): Promise<string> {
  const client = getHederaClient();
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(accountId))
      .execute(client);
    return balance.hbars.toString();
  } finally {
    client.close();
  }
}

export async function transferHbar(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  memo?: string
): Promise<string> {
  const client = getHederaClient();
  try {
    const transaction = new TransferTransaction()
      .addHbarTransfer(fromAccountId, new Hbar(-amount))
      .addHbarTransfer(toAccountId, new Hbar(amount));
    if (memo) {
      transaction.setTransactionMemo(memo);
    }
    const response = await transaction.execute(client);
    await response.getReceipt(client);
    return response.transactionId.toString();
  } finally {
    client.close();
  }
}

export async function executeContractFunction(
  contractId: string,
  functionName: string,
  params?: ContractFunctionParameters,
  gas: number = 100000
): Promise<string> {
  const client = getHederaClient();
  try {
    const transaction = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gas)
      .setFunction(functionName, params);
    const response = await transaction.execute(client);
    await response.getReceipt(client);
    return response.transactionId.toString();
  } finally {
    client.close();
  }
}

export async function callContractFunction(
  contractId: string,
  functionName: string,
  params?: ContractFunctionParameters,
  gas: number = 100000
): Promise<any> {
  const client = getHederaClient();
  try {
    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(gas)
      .setFunction(functionName, params);
    const result = await query.execute(client);
    return result;
  } finally {
    client.close();
  }
}

export function isValidAccountId(accountId: string): boolean {
  try {
    AccountId.fromString(accountId);
    return true;
  } catch {
    return false;
  }
}

export function tinybarToHbar(tinybar: number | string): string {
  return Hbar.fromTinybars(tinybar).toString();
}

export function hbarToTinybar(hbar: number | string): string {
  return new Hbar(hbar).toTinybars().toString();
}
