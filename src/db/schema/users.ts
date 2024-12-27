import { pgTable, uuid, pgSchema, varchar } from "drizzle-orm/pg-core";
import { baseColumns } from "../helpers/columns.helper";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
    id: uuid("id").primaryKey(),
});

const { id, ...restBaseColumns } = baseColumns;

const userProfiles = pgTable("user_profiles", {
    id: uuid("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    displayName: varchar("display_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }),
    ...restBaseColumns
});

export default userProfiles
