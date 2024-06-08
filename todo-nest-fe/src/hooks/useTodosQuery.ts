import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/getTodos';

export const useTodosQuery = () =>
  useQuery({ queryKey: ['todos'], queryFn: getTodos });
