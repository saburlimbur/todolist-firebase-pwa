import { useMutation, useQuery } from '@tanstack/react-query';
import { allUsers, createUserWithEmail, loginUserWithEmail } from '../service/userService';

export function useAllUsers() {
  const {
    data: allUsersQuery,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: allUsers,
  });

  return { allUsersQuery, isLoading, isError };
}

export function useCreateUserWithEmail() {
  const {
    mutate: createUserWithEmailMutation,
    onError,
    isSuccess,
  } = useMutation({
    mutationKey: ['createUserWithEmail'],
    mutationFn: (data) => createUserWithEmail(data.email, data.password),
  });

  return { createUserWithEmailMutation, onError, isSuccess };
}

export function useLoginUserWithEmail() {
  const {
    mutate: loginUserWithEmailMutation,
    onError,
    onSucces,
  } = useMutation({
    mutationKey: ['loginUserWithEmail'],
    mutationFn: (data) => loginUserWithEmail(data.email, data.password),
  });

  return { loginUserWithEmailMutation, onError, onSucces };
}
