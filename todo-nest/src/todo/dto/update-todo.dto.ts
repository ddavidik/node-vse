import { z } from 'zod';
import { priority } from '../entities/todo.entity';

export const updateTodoSchema = z.object({
  name: z.string().optional(),
  isDone: z.boolean().optional(),
  priority: z.enum(priority).optional(),
});

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
