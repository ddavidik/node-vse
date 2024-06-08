import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const priority = ['low', 'normal', 'high'] as const;

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  name: text('name').notNull(),
  isDone: boolean('is_done').notNull().default(false),
  priority: pgEnum('Priority', priority)('priority')
    .notNull()
    .default('normal'),
});

export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;
export type UpdateTodo = Partial<NewTodo>;
