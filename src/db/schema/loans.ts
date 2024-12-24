import { numeric, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "../helpers/columns.helper";
import userProfiles from "./users";

export const loanTypeEnum = pgEnum('loanType', ['lender', 'borrower']);

export const loans = pgTable("loans", {
    userId: uuid("user_id").references(() => userProfiles.id, { onDelete: 'cascade' }).notNull(),
    amount: numeric("amount").notNull(),
    description: varchar("description"),
    loanType: loanTypeEnum().notNull(),
    contact: varchar("contact").notNull(),
    dueDate: timestamp("due_date"),
    ...baseColumns
});
