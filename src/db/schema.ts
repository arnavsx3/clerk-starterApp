import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userModel = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
