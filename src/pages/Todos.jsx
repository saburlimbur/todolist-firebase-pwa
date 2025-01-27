import React from 'react';
import { useAllTodos } from '../hooks/useTodos';

function Todos() {
  const { allTodoQuery, isLoading, isError } = useAllTodos();

  console.log('todo:', allTodoQuery);

  return (
    <div>
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
