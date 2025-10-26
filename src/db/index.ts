import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Initialize the database connection
const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL);
const db: NeonHttpDatabase = drizzle(sql);

export { sql, db };
