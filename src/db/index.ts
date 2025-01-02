import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/schema';
import postgres from 'postgres';

config({ path: '.env' });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client, schema, casing: 'snake_case' });
