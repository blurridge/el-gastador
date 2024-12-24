import { pgTable, uuid, pgSchema, varchar } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
    id: uuid("id").primaryKey(),
});

const userProfiles = pgTable("user_profiles", {
    id: uuid("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }),
});

export default userProfiles
