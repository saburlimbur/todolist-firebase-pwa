import React from 'react';
import { useAllTodos } from '../hooks/useTodos';
import Profile from '../components/template/Profile';

function Todos() {
  const { allTodoQuery, isLoading, isError } = useAllTodos();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('todo:', allTodoQuery);
  console.log('user:', user);

  return (
    <div>
      <Profile />
      {Array.isArray(allTodoQuery) &&
        allTodoQuery.map((e) => {
          const { title, status, description } = e;

          return (
            <div key={e.id}>
              <p>title: {title}</p>
              <p>status: {status.complete ? 'Complete' : status.pending ? 'Pending' : 'Archived'}</p>
              <p>desc: {description}</p>
              {/* <p>date: {created_at}</p> */}
            </div>
          );
        })}
    </div>
  );
}

export default Todos;
