import { baseColumns } from '../helpers/columns.helper';
import { sql } from 'drizzle-orm';
import { numeric, pgPolicy, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

import { categories } from './categories';
import { userProfiles } from './users';

export const transactions = pgTable('transactions', {
  amount: numeric('amount').notNull(),
  description: varchar('description', { length: 256 }),
  categoryId: uuid('category_id')
    .references(() => categories.id, { onDelete: 'set null' })
    .notNull(),
  userId: uuid('user_id')
    .references(() => userProfiles.id, { onDelete: 'cascade' })
    .notNull(),
  ...baseColumns,
});

export const transactionPolicy = pgPolicy('transactions_policy', {
  for: 'all',
  to: authenticatedRole,
  using: sql`${transactions}.user_id = auth.uid()`,
  withCheck: sql`${transactions}.user_id = auth.uid()`,
}).link(transactions);
