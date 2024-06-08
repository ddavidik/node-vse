import { apiClient } from './apiClient';

export const deleteTodo = async (id: number) => {
  try {
    return (await apiClient.delete(`/todos/${id}`)).data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
