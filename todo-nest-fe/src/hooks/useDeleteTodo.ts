import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/deleteTodo';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-todo'],
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};
