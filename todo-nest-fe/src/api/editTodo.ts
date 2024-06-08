import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';
import { apiClient } from './apiClient';

type EditTodoData = Pick<Todo, 'id' | 'name' | 'isDone' | 'priority'>;

export const editTodo = async (data: EditTodoData) => {
  try {
    return (await apiClient.put(`/todos/${data.id}`, data)).data;
  } catch (error) {
    console.error('Error editing todo:', error);
    throw error;
  }
};
