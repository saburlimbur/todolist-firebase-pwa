import { useMutation, useQuery } from '@tanstack/react-query';
import { allTodos, createTodos } from '../service/todoService';

export function useAllTodos() {
  const {
    data: allTodoQuery,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: allTodos,
  });

  return { allTodoQuery, isLoading, isError, refetch };
}

export function useCreateTodos() {
  const {
    mutate: createTodoMutation,
    onError,
    isSuccess,
  } = useMutation({
    mutationKey: ['createTodos'],
    mutationFn: createTodos,
  });

  return { createTodoMutation, onError, isSuccess };
}
