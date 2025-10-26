import { executeContractFunction, callContractFunction } from './provider';
import { ContractFunctionParameters } from '@hashgraph/sdk';

export class PaymentContract {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ID || '';
  }

  async processPayment(from: string, to: string, amount: number): Promise<string> {
    const params = new ContractFunctionParameters()
      .addString(from)
      .addString(to)
      .addUint256(amount);
    
    return executeContractFunction(this.contractId, 'processPayment', params);
  }

  async getPaymentHistory(accountId: string, limit: number = 10): Promise<any> {
    const params = new ContractFunctionParameters()
      .addString(accountId)
      .addUint256(limit);
    
    return callContractFunction(this.contractId, 'getPaymentHistory', params);
  }
}

export class WalletContract {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_WALLET_CONTRACT_ID || '';
  }

  async createWallet(accountId: string): Promise<string> {
    const params = new ContractFunctionParameters()
      .addString(accountId);
    
    return executeContractFunction(this.contractId, 'createWallet', params);
  }

  async getWalletInfo(accountId: string): Promise<any> {
    const params = new ContractFunctionParameters()
      .addString(accountId);
    
    return callContractFunction(this.contractId, 'getWalletInfo', params);
  }
}

export class InvoicingContract {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_INVOICING_CONTRACT_ID || '';
  }

  async createInvoice(invoiceData: any): Promise<string> {
    const params = new ContractFunctionParameters()
      .addString(JSON.stringify(invoiceData));
    
    return executeContractFunction(this.contractId, 'createInvoice', params);
  }

  async getInvoice(invoiceId: string): Promise<any> {
    const params = new ContractFunctionParameters()
      .addString(invoiceId);
    
    return callContractFunction(this.contractId, 'getInvoice', params);
  }
}

export class PayrollContract {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ID || '';
  }

  async processPayroll(entries: any[]): Promise<string> {
    const params = new ContractFunctionParameters()
      .addString(JSON.stringify(entries));
    
    return executeContractFunction(this.contractId, 'processPayroll', params);
  }
}

export class TokenContract {
  private contractId: string;

  constructor() {
    this.contractId = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ID || '';
  }

  async getBalance(accountId: string): Promise<any> {
    const params = new ContractFunctionParameters()
      .addString(accountId);
    
    return callContractFunction(this.contractId, 'balanceOf', params);
  }

  async transfer(from: string, to: string, amount: number): Promise<string> {
    const params = new ContractFunctionParameters()
      .addString(from)
      .addString(to)
      .addUint256(amount);
    
    return executeContractFunction(this.contractId, 'transfer', params);
  }
}
