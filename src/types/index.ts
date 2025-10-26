// Core application types
export interface AppMetadata {
  name: string;
  description: string;
  url: string;
  icons?: string[];
}

// Thirdweb configuration types
export interface Chain {
  id: number;
  name: string;
  rpc: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  testnet?: boolean;
  slug?: string;
  chainId: number;
}

export interface ThirdwebConfig {
  clientId: string;
  chains?: Chain[];
}

// Environment variables type
// Environment variables type
type NodeEnv = 'development' | 'production' | 'test';

export interface EnvConfig {
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string;
  NODE_ENV: NodeEnv;
  NEXT_PUBLIC_APP_URL?: string;
  NEXT_PUBLIC_INFURA_ID?: string;
  NEXT_PUBLIC_ALCHEMY_ID?: string;
  // Add other environment variables as needed
}

// Component prop types
export interface ArticleCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  href: string;
  description: string;
  className?: string;
  // Extend with additional props as needed
  variant?: 'default' | 'featured' | 'compact';
  imageUrl?: string;
  date?: Date | string;
  readTime?: string;
  tags?: string[];
}

export interface HeaderProps {
  className?: string;
}

export interface ThirdwebResourcesProps {
  className?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string | Error;
  message?: string;
  success: boolean;
  statusCode?: number;
  timestamp?: string;
}

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type Builtin = Primitive | Function | Date | Error | RegExp;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U>
  ? Set<DeepPartial<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepPartial<U>>
  : T extends Promise<infer U>
  ? Promise<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// Error types
export type ErrorDetails = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | ErrorDetails[] 
  | { [key: string]: ErrorDetails };

export interface AppError {
  code: string;
  message: string;
  details?: ErrorDetails;
  stack?: string;
  cause?: unknown;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Wallet connection types
export interface WalletConnection {
  address: string;
  chainId: number;
  isConnected: boolean;
}

// Contract interaction types
export type ContractParameter = string | number | boolean | bigint | Uint8Array | Record<string, unknown>;

export interface ContractCall {
  contractAddress: `0x${string}`;
  method: string;
  params?: ContractParameter[];
  value?: string;
}

// Transaction status type
type TransactionStatus = 'pending' | 'confirmed' | 'failed';

export interface TransactionResult {
  hash: `0x${string}`;
  status: TransactionStatus;
  blockNumber?: number;
  gasUsed?: string;
  timestamp?: number;
  from?: `0x${string}`;
  to?: `0x${string}`;
  transactionIndex?: number;
}
