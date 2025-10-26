import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import * as authSchema from "@/db/auth-schema";

// Check if we're in a server environment
const isServer = typeof window === 'undefined';

if (!isServer) {
  throw new Error('Auth should only be used on the server side');
}

// Define the database adapter configuration
const databaseConfig = {
  provider: "pg" as const, // Explicitly type as 'pg' literal
  // Pass the schema to the adapter
  schema: {
    user: authSchema.user,
    session: authSchema.session,
    account: authSchema.account,
    verification: authSchema.verification,
  }
};

export const auth = betterAuth({
  database: drizzleAdapter(db, databaseConfig),
  // Configure advanced settings
  advanced: {
    database: {
      generateId: false,
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});