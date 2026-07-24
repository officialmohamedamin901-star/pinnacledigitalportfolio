import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Users table linked with Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// CMS Configuration & Data document store table
export const cmsConfigs = pgTable('cms_configs', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique().default('config'),
  content: jsonb('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Users relations
export const usersRelations = relations(users, () => ({}));
