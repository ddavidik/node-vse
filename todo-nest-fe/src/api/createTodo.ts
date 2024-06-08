import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';
import { apiClient } from './apiClient';

export type CreateTodoData = Pick<Todo, 'name' | 'isDone' | 'priority'>;

export const createTodo = async (data: CreateTodoData) => {
  try {
    return (await apiClient.post(`/todos`, data)).data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};
