import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length:255}).notNull(),
  verifyCode: varchar({length:6}).notNull(),
  verifyCodeExpiry: timestamp().notNull(),
  isVerified: boolean().default(false),
  description: varchar({length:255}),
  picture: varchar({length:255})
});

export const links = pgTable("links",{
  id : serial("id").primaryKey(),
  userId: integer("user_id").references(()=>userTable.id).notNull(),
  link: varchar({length:255}),
  linkText: varchar({length:255}),
  messageId:varchar().unique()
})