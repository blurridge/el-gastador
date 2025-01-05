import { relations } from 'drizzle-orm';

import { categories } from './categories';
import { loans } from './loans';
import { transactions } from './transactions';
import { userProfiles } from './users';

export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
    transactions: many(transactions, { relationName: 'createdBy' }),
    loans: many(loans, { relationName: 'createdBy' }),
    categories: many(categories, { relationName: 'createdBy' }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    createdBy: one(userProfiles, {
        fields: [transactions.userId],
        references: [userProfiles.id],
        relationName: 'createdBy',
    }),
    category: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
        relationName: 'category',
    }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    createdBy: one(userProfiles, {
        fields: [categories.userId],
        references: [userProfiles.id],
        relationName: 'createdBy',
    }),
    transactionsToCategories: many(transactions, {
        relationName: 'transactionsToCategories',
    }),
}));

export const loansRelations = relations(loans, ({ one }) => ({
    createdBy: one(userProfiles, {
        fields: [loans.userId],
        references: [userProfiles.id],
        relationName: 'createdBy',
    }),
}));
