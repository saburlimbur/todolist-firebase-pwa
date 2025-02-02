import React from 'react';
import { useAllTodos } from '../hooks/useTodos';
import FormsTodo from '../components/template/FormsTodo';
import Card from '../components/fragments/Card';
import { format } from 'date-fns';
import CardStatus from '../components/template/CardStatus';
import Button from '../components/elements/Button';
import HeaderProfile from '../components/template/HeaderProfile';
import LoadingElement from '../components/elements/LoadingElement';
import ErrorElement from '../components/elements/ErrorElement';

function Todos() {
  const { allTodoQuery, isLoading, isError, refetch } = useAllTodos();
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
          refetch,
        };
      })
    : [];

  return (
    <div className="w-full max-w-4xl sm:max-w-xl mx-auto py-5 px-4">
      <HeaderProfile />
      <CardStatus className="py-8" />
      {isLoading && <LoadingElement />}
      {isError && <ErrorElement />}
      <div className="flex flex-col gap-5">
        {getDataTodo.length > 0 ? (
          getDataTodo.map((e) => {
            const { id, title, status, description, formattedDate } = e;

            return (
              <Card key={id} className="bg-[#F9F9F9] py-5 px-3 hover:bg-[#ececec]">
                <Card.Header className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <p
                    className={`text-xs font-medium px-4 py-2 rounded-full 
                    ${status.complete ? 'bg-green-100 text-green-800' : status.pending ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {status.complete ? 'Complete' : status.pending ? 'Pending' : 'Archived'}
                  </p>
                </Card.Header>

                <div className="flex justify-between items-center">
                  <Card.Body className="border-t border-t-gray-200 pt-3 flex items-center gap-2">
                    <img src={user?.photoURL || `https://api.multiavatar.com/${encodeURIComponent(user?.uid)}.svg`} className="rounded-full w-6 h-6" />
                    <p className="text-xs text-gray-600">{user.displayName}</p>
                  </Card.Body>
                  <Card.Footer>
                    <p className="text-xs text-gray-500">{formattedDate}</p>
                  </Card.Footer>
                </div>
              </Card>
            );
          })
        ) : (
          // ternary
          <p>No Todos</p>
        )}
      </div>
      <div className="">
        <FormsTodo />
      </div>
    </div>
  );
}

export default Todos;
