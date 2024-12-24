import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "../helpers/columns.helper";
import userProfiles from "./users";


const categories = pgTable("categories", {
    name: varchar("name").notNull(),
    userId: uuid("user_id").references(() => userProfiles.id, { onDelete: "cascade" }).notNull(),
    ...baseColumns
});

export default categories
