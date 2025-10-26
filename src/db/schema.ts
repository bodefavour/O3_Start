import { pgTable, text, timestamp, decimal, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: text('email').notNull().unique(),
    emailVerified: timestamp('email_verified'),
    image: text('image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),

    // Business Info
    businessName: text('business_name'),
    businessType: text('business_type'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    phoneNumber: text('phone_number'),
}, (table) => ({
    emailIdx: index('user_email_idx').on(table.email),
}));

// Accounts table (for OAuth)
export const accounts = pgTable('accounts', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: timestamp('expires_at'),
    tokenType: text('token_type'),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
}, (table) => ({
    userIdx: index('account_user_idx').on(table.userId),
    providerIdx: uniqueIndex('account_provider_idx').on(table.provider, table.providerAccountId),
}));

// Sessions table
export const sessions = pgTable('sessions', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    sessionToken: text('session_token').notNull().unique(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires').notNull(),
}, (table) => ({
    userIdx: index('session_user_idx').on(table.userId),
    tokenIdx: index('session_token_idx').on(table.sessionToken),
}));

// Wallets table
export const wallets = pgTable('wallets', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    symbol: text('symbol').notNull(), // USDC, USDT, NGN, KES, etc.
    type: text('type').notNull(), // stablecoin, local_currency
    balance: decimal('balance', { precision: 20, scale: 8 }).default('0').notNull(),
    address: text('address').notNull().unique(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userIdx: index('wallet_user_idx').on(table.userId),
    symbolIdx: index('wallet_symbol_idx').on(table.symbol),
    addressIdx: index('wallet_address_idx').on(table.address),
}));

// Transactions table
export const transactions = pgTable('transactions', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(), // incoming, outgoing, swap
    status: text('status').notNull(), // completed, pending, failed, cancelled
    amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
    currency: text('currency').notNull(),
    fromAddress: text('from_address'),
    toAddress: text('to_address'),
    networkFee: decimal('network_fee', { precision: 20, scale: 8 }),
    note: text('note'),
    hash: text('hash').unique(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userIdx: index('transaction_user_idx').on(table.userId),
    statusIdx: index('transaction_status_idx').on(table.status),
    createdIdx: index('transaction_created_idx').on(table.createdAt),
    hashIdx: index('transaction_hash_idx').on(table.hash),
}));

// Invoices table
export const invoices = pgTable('invoices', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    invoiceNumber: text('invoice_number').notNull().unique(),
    clientName: text('client_name').notNull(),
    description: text('description').notNull(),
    amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
    currency: text('currency').default('USD').notNull(),
    status: text('status').notNull(), // paid, sent, overdue, draft
    dueDate: timestamp('due_date'),
    paidAt: timestamp('paid_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userIdx: index('invoice_user_idx').on(table.userId),
    statusIdx: index('invoice_status_idx').on(table.status),
    numberIdx: index('invoice_number_idx').on(table.invoiceNumber),
}));

// Employees table
export const employees = pgTable('employees', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    employeeId: text('employee_id').notNull().unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    position: text('position').notNull(),
    department: text('department').notNull(),
    salary: decimal('salary', { precision: 20, scale: 2 }).notNull(),
    currency: text('currency').default('USD').notNull(),
    status: text('status').default('active').notNull(),
    joinedDate: timestamp('joined_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    userIdx: index('employee_user_idx').on(table.userId),
    employeeIdIdx: index('employee_id_idx').on(table.employeeId),
    statusIdx: index('employee_status_idx').on(table.status),
}));

// Exchange Rates table
export const exchangeRates = pgTable('exchange_rates', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    fromCurrency: text('from_currency').notNull(),
    toCurrency: text('to_currency').notNull(),
    rate: decimal('rate', { precision: 20, scale: 8 }).notNull(),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table) => ({
    currencyIdx: index('exchange_rate_currency_idx').on(table.fromCurrency, table.toCurrency),
    timestampIdx: index('exchange_rate_timestamp_idx').on(table.timestamp),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    wallets: many(wallets),
    transactions: many(transactions),
    invoices: many(invoices),
    employees: many(employees),
}));

export const walletsRelations = relations(wallets, ({ one }) => ({
    user: one(users, {
        fields: [wallets.userId],
        references: [users.id],
    }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
    user: one(users, {
        fields: [invoices.userId],
        references: [users.id],
    }),
}));

export const employeesRelations = relations(employees, ({ one }) => ({
    user: one(users, {
        fields: [employees.userId],
        references: [users.id],
    }),
}));
