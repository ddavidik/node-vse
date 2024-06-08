import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTodo } from '../api/editTodo';

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['edit-todo'],
    mutationFn: editTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', 'todo'] }),
  });
};
