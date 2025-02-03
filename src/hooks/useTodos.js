import { useMutation, useQuery } from '@tanstack/react-query';
import { allTodos, createTodos, getTodoByUserId } from '../service/todoService';
import { auth } from '../config/firebase';

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
    onSuccess,
  } = useMutation({
    mutationKey: ['createTodos'],
    mutationFn: createTodos,
  });

  return { createTodoMutation, onError, onSuccess };
}

export function useGetTodoByUserId(uid) {
  const {
    data: getTodoUserId,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todoUserId', uid],
    queryFn: () => getTodoByUserId(uid),
    enabled: !!uid,
  });

  return { getTodoUserId, isLoading, isError };
}
