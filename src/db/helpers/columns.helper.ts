import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseColumns = {
    id: uuid('id').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
};
