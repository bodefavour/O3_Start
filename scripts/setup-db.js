#!/usr/bin/env node

/**
 * Database Setup Script
 * This script pushes the schema to the database and seeds it with sample data
 */

const { execSync } = require('child_process');

console.log('🚀 Starting database setup...\n');

try {
    // Step 1: Push schema to database
    console.log('📊 Step 1: Pushing schema to database...');
    execSync('npx drizzle-kit push --force', {
        stdio: 'inherit',
        cwd: __dirname,
    });
    console.log('✅ Schema pushed successfully\n');

    // Step 2: Seed database
    console.log('🌱 Step 2: Seeding database with sample data...');
    execSync('tsx src/db/seed.ts', {
        stdio: 'inherit',
        cwd: __dirname,
    });
    console.log('✅ Database seeded successfully\n');

    console.log('🎉 Database setup complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Login with: demo@o3.com\n');
} catch (error) {
    console.error('❌ Error during database setup:', error.message);
    process.exit(1);
}
