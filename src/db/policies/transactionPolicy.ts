import { pgPolicy } from 'drizzle-orm/pg-core';
import { transactions } from '../schema';
import { sql } from 'drizzle-orm';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const transactionPolicy = pgPolicy('transactions_policy', {
    for: 'all',
    to: authenticatedRole,
    using: sql`${transactions}.user_id = auth.uid()`,
    withCheck: sql`${transactions}.user_id = auth.uid()`,
}).link(transactions);
