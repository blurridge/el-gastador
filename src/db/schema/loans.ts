import { baseColumns } from '../helpers/columns.helper';
import { sql } from 'drizzle-orm';
import { numeric, pgEnum, pgPolicy, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

import { userProfiles } from './users';

export const loanTypeEnum = pgEnum('loan_type', ['lender', 'borrower']);

export const loans = pgTable('loans', {
    userId: uuid('user_id')
        .references(() => userProfiles.id, { onDelete: 'cascade' })
        .notNull(),
    amount: numeric('amount').notNull(),
    description: varchar('description'),
    loanType: loanTypeEnum('loan_type').notNull(),
    contact: varchar('contact').notNull(),
    dueDate: timestamp('due_date'),
    ...baseColumns,
});

export const loansPolicy = pgPolicy('loans_policy', {
    for: 'all',
    to: authenticatedRole,
    using: sql`${loans}.user_id = auth.uid()`,
    withCheck: sql`${loans}.user_id = auth.uid()`,
}).link(loans);
