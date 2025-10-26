import 'dotenv/config';
import { db } from './index';
import { users, wallets, transactions, invoices, employees, exchangeRates } from './schema';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Create a test user
    console.log('Creating test user...');
    const [user] = await db
      .insert(users)
      .values({
        email: 'demo@o3.com',
        businessName: 'O3 Payments Demo',
        businessType: 'Technology',
        firstName: 'Demo',
        lastName: 'User',
        phoneNumber: '+1234567890',
      })
      .returning()
      .onConflictDoNothing();

    if (!user) {
      console.log('User already exists, fetching...');
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, 'demo@o3.com'))
        .limit(1);
      
      if (existingUser.length === 0) {
        throw new Error('Could not create or find user');
      }
      
      console.log('✅ Using existing user');
    } else {
      console.log('✅ Test user created');
    }

    const userId = user?.id || (await db.select().from(users).limit(1))[0].id;

    // Create wallets
    console.log('Creating wallets...');
    const currencies = [
      { name: 'USD Coin', symbol: 'USDC', type: 'stablecoin', balance: '12450.50' },
      { name: 'Tether', symbol: 'USDT', type: 'stablecoin', balance: '8750.25' },
      { name: 'Nigerian Naira', symbol: 'NGN', type: 'local_currency', balance: '4500000.00' },
      { name: 'Kenyan Shilling', symbol: 'KES', type: 'local_currency', balance: '3250000.00' },
      { name: 'Ghanaian Cedi', symbol: 'GHS', type: 'local_currency', balance: '125000.00' },
      { name: 'Hedera USD', symbol: 'HUSD', type: 'stablecoin', balance: '5600.75' },
    ];

    for (const currency of currencies) {
      await db
        .insert(wallets)
        .values({
          userId,
          name: currency.name,
          symbol: currency.symbol,
          type: currency.type,
          balance: currency.balance,
          address: `0x${Math.random().toString(16).substr(2, 40)}`,
          isActive: true,
        })
        .onConflictDoNothing();
    }
    console.log('✅ Wallets created');

    // Create sample transactions
    console.log('Creating transactions...');
    const txTypes = ['incoming', 'outgoing', 'swap'];
    const txStatuses = ['completed', 'pending', 'failed'];
    
    for (let i = 0; i < 20; i++) {
      const type = txTypes[Math.floor(Math.random() * txTypes.length)];
      const status = i < 15 ? 'completed' : txStatuses[Math.floor(Math.random() * txStatuses.length)];
      const currency = currencies[Math.floor(Math.random() * currencies.length)].symbol;
      const amount = (Math.random() * 1000 + 100).toFixed(2);
      
      await db
        .insert(transactions)
        .values({
          userId,
          type,
          status,
          amount,
          currency,
          fromAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          toAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          networkFee: (parseFloat(amount) * 0.001).toFixed(8),
          hash: status === 'completed' ? `0x${Math.random().toString(16).substr(2, 64)}` : null,
          note: `Sample ${type} transaction`,
        })
        .onConflictDoNothing();
    }
    console.log('✅ Transactions created');

    // Create sample invoices
    console.log('Creating invoices...');
    const invoiceStatuses = ['paid', 'sent', 'overdue', 'draft'];
    const clients = ['Acme Corp', 'TechStart Inc', 'Global Systems', 'Digital Solutions', 'Innovation Labs'];
    
    for (let i = 0; i < 15; i++) {
      const status = invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)];
      const client = clients[Math.floor(Math.random() * clients.length)];
      const amount = (Math.random() * 5000 + 500).toFixed(2);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 60) - 30);
      
      await db
        .insert(invoices)
        .values({
          userId,
          invoiceNumber: `INV-2024-${(i + 1).toString().padStart(4, '0')}`,
          clientName: client,
          description: `Professional services for ${client}`,
          amount,
          currency: 'USD',
          status,
          dueDate,
          paidAt: status === 'paid' ? new Date() : null,
        })
        .onConflictDoNothing();
    }
    console.log('✅ Invoices created');

    // Create sample employees
    console.log('Creating employees...');
    const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'Finance'];
    const positions = [
      'Software Engineer',
      'Sales Manager',
      'Marketing Specialist',
      'Operations Manager',
      'Financial Analyst',
    ];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    for (let i = 0; i < 12; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const salary = (Math.random() * 100000 + 50000).toFixed(2);
      
      await db
        .insert(employees)
        .values({
          userId,
          employeeId: `EMP-${(i + 1).toString().padStart(4, '0')}`,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
          position,
          department,
          salary,
          currency: 'USD',
          status: 'active',
          joinedDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        })
        .onConflictDoNothing();
    }
    console.log('✅ Employees created');

    // Create exchange rates
    console.log('Creating exchange rates...');
    const rates = [
      { from: 'USDC', to: 'USDT', rate: '1.0' },
      { from: 'USDT', to: 'USDC', rate: '1.0' },
      { from: 'USDC', to: 'NGN', rate: '1580.50' },
      { from: 'NGN', to: 'USDC', rate: '0.000633' },
      { from: 'USDC', to: 'KES', rate: '129.75' },
      { from: 'KES', to: 'USDC', rate: '0.00771' },
      { from: 'USDC', to: 'GHS', rate: '15.85' },
      { from: 'GHS', to: 'USDC', rate: '0.0631' },
      { from: 'USDC', to: 'HUSD', rate: '1.0' },
      { from: 'HUSD', to: 'USDC', rate: '1.0' },
    ];
    
    for (const rate of rates) {
      await db
        .insert(exchangeRates)
        .values({
          fromCurrency: rate.from,
          toCurrency: rate.to,
          rate: rate.rate,
        })
        .onConflictDoNothing();
    }
    console.log('✅ Exchange rates created');

    console.log('🎉 Database seeded successfully!');
    console.log('\n📧 Demo user credentials:');
    console.log('Email: demo@o3.com');
    console.log('\n💰 6 wallets with balances');
    console.log('📊 20 sample transactions');
    console.log('📄 15 invoices');
    console.log('👥 12 employees');
    console.log('💱 10 exchange rates');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seed
seed()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('\n✨ Seed script completed');
    process.exit(0);
  });
