import { z } from 'zod';
import { priority } from '../entities/todo.entity';

export const createTodoSchema = z.object({
  name: z.string().min(1),
  isDone: z.boolean().optional().default(false),
  priority: z.enum(priority).optional().default('normal'),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
