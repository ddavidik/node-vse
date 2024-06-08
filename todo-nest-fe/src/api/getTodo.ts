import { apiClient } from './apiClient';
import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';

export const getTodo = async (id: string | undefined): Promise<Todo> => {
  const response = await apiClient.get<Todo>(`/todos/${id}`);
  return response.data;
};
