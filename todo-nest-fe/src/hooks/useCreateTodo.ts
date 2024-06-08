import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../api/createTodo';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-todo'],
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
};
