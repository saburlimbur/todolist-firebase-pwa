import React from 'react';
import { useAllTodos } from '../hooks/useTodos';
import Profile from '../components/template/Profile';
import FormsTodo from '../components/template/FormsTodo';

function Todos() {
  const { allTodoQuery, isLoading, isError } = useAllTodos();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('todo:', allTodoQuery);
  console.log('user:', user);

  return (
    <div className="w-full max-w-2xl sm:max-w-xl mx-auto px-6">
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

      <FormsTodo />
    </div>
  );
}

export default Todos;
