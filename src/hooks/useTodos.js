import { useMutation, useQuery } from '@tanstack/react-query';
import { allTodos } from '../service/todoService';

export function useAllTodos() {
  const {
    data: allTodoQuery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: allTodos,
  });

  return { allTodoQuery, isLoading, isError };
}

export function useCreateTodos() {
  const {} = useMutation({
    mutationKey: ['createTodos'],
    // mutationFn:
  });
}
