import { useQuery } from '@tanstack/react-query';
import { allUsers } from '../service/userService';

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
