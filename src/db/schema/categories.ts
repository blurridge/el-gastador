import { baseColumns } from '../helpers/columns.helper';
import { sql } from 'drizzle-orm';
import { boolean, pgEnum, pgPolicy, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

import { userProfiles } from './users';

export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);

export const categories = pgTable('categories', {
  name: varchar('name').notNull(),
  userId: uuid('user_id').references(() => userProfiles.id, { onDelete: 'cascade' }),
  default: boolean('default').default(false).notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  ...baseColumns,
});

export const categoriesSelectPolicy = pgPolicy('categories_policy', {
  for: 'select',
  to: authenticatedRole,
  using: sql`${categories}.user_id = auth.uid() OR (${categories}.user_id IS NULL AND ${categories}.default = true)`,
}).link(categories);

export const categoriesInsertPolicy = pgPolicy('categories_insert_policy', {
  for: 'insert',
  to: authenticatedRole,
  withCheck: sql`${categories}.user_id = auth.uid()`,
}).link(categories);

export const categoriesUpdatePolicy = pgPolicy('categories_update_policy', {
  for: 'update',
  to: authenticatedRole,
  using: sql`${categories}.user_id = auth.uid()`,
  withCheck: sql`${categories}.user_id = auth.uid()`,
}).link(categories);

export const categoriesDeletePolicy = pgPolicy('categories_delete_policy', {
  for: 'delete',
  to: authenticatedRole,
  using: sql`${categories}.user_id = auth.uid()`,
}).link(categories);
