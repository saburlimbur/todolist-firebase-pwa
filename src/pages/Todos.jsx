import React from 'react';
import { useAllTodos } from '../hooks/useTodos';
import Profile from '../components/template/Profile';
import FormsTodo from '../components/template/FormsTodo';
import Card from '../components/fragments/Card';
import { format } from 'date-fns';
import CardStatus from '../components/template/CardStatus';
import Button from '../components/elements/Button';

function Todos() {
  const { allTodoQuery, isLoading, isError } = useAllTodos();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('todo:', allTodoQuery);
  console.log('user:', user);

  const getDataTodo = Array.isArray(allTodoQuery)
    ? allTodoQuery.map((item) => {
        const { seconds, nanoseconds } = item.created_at; // object response todolist created_at
        const date = new Date(seconds * 1000 + nanoseconds / 1e6);

        return {
          ...item,
          formattedDate: format(date, 'yyyy-MM-dd'),
        };
      })
    : [];

  return (
    <div className="w-full max-w-4xl sm:max-w-xl mx-auto py-10 px-4">
      <Profile />
      <CardStatus className="py-8" />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data.</p>}

      {getDataTodo.length > 0 ? (
        getDataTodo.map((e) => {
          const { id, title, status, description, formattedDate } = e;

          return (
            <Card key={id}>
              <Card.Header>Title: {title}</Card.Header>
              <Card.Body>Status: {status.complete ? 'Complete' : status.pending ? 'Pending' : 'Archived'}</Card.Body>
              <Card.Body>Description: {description}</Card.Body>
              <Card.Body>Date: {formattedDate}</Card.Body>
            </Card>
          );
        })
      ) : ( // ternary
        <p>No Todos</p>
      )}

      <div className="">
        <FormsTodo />
      </div>
    </div>
  );
}

export default Todos;
