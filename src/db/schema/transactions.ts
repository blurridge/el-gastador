import { pgTable, uuid, numeric, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "../helpers/columns.helper";
import userProfiles from "./users";
import { categories } from "./categories";

export const transactions = pgTable("transactions", {
    amount: numeric("amount").notNull(),
    description: varchar("description", { length: 256 }),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: 'set null' }).notNull(),
    userId: uuid("user_id").references(() => userProfiles.id, { onDelete: 'cascade' }).notNull(),
    ...baseColumns
});

