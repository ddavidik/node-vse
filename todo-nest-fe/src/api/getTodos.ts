import { apiClient } from './apiClient';
import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';

export const getTodos = async () => {
  const response = await apiClient.get<Todo[]>('/todos');

  return response.data;
};
