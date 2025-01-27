import React from 'react';
import { useAllTodos } from '../hooks/useTodos';

function Todos() {
  const { allTodoQuery, isLoading, isError } = useAllTodos();

  console.log('todo:', allTodoQuery);

  return (
    <div>
      <h2>Todos</h2>
    </div>
  );
}

export default Todos;
