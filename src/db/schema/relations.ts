import { relations } from "drizzle-orm";
import userProfiles from "./users";
import transactions from "./transactions";
import { loans } from "./loans";
import categories from "./categories";

export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
    transactions: many(transactions, { relationName: "createdBy" }),
    loans: many(loans, { relationName: "createdBy" }),
    categories: many(categories, { relationName: "createdBy" })
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    createdBy: one(userProfiles, {
        fields: [transactions.userId],
        references: [userProfiles.id],
        relationName: 'createdBy'
    })
}))

export const categoriesRelations = relations(categories, ({ one }) => ({
    createdBy: one(userProfiles, {
        fields: [categories.userId],
        references: [userProfiles.id],
        relationName: 'createdBy'
    })
}))

export const loansRelations = relations(loans, ({ one }) => ({
    createdBy: one(userProfiles, {
        fields: [loans.userId],
        references: [userProfiles.id],
        relationName: 'createdBy'
    })
}))
