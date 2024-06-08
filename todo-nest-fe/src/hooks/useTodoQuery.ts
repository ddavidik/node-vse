import { useQuery } from '@tanstack/react-query';
import { getTodo } from '../api/getTodo';

export const useTodoQuery = (id: string | undefined) =>
  useQuery({ queryKey: ['todo', id], queryFn: () => getTodo(id) });
