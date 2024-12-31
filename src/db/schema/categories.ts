import { boolean, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "../helpers/columns.helper";
import userProfiles from "./users";

export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);

export const categories = pgTable("categories", {
    name: varchar("name").notNull(),
    userId: uuid("user_id").references(() => userProfiles.id, { onDelete: "cascade" }),
    default: boolean("default").default(false).notNull(),
    transactionType: transactionTypeEnum('transaction_type').notNull(),
    ...baseColumns
});
