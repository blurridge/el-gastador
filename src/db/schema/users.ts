import { baseColumns } from '../helpers/columns.helper';
import { sql } from 'drizzle-orm';
import { pgPolicy, pgSchema, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

const { id, ...restBaseColumns } = baseColumns;

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  displayName: varchar('display_name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }),
  ...restBaseColumns,
});

export const userProfilesPolicy = pgPolicy('user_profiles_policy', {
  for: 'all',
  to: authenticatedRole,
  using: sql`${userProfiles}.id = auth.uid()`,
  withCheck: sql`${userProfiles}.id = auth.uid()`,
}).link(userProfiles);
