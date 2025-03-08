import React from 'react';
import { useAllTodos } from '../hooks/useTodos';
import Card from '../components/fragments/Card';
import { format } from 'date-fns';
import CardStatus from '../components/template/CardStatus';
import HeaderProfile from '../components/template/HeaderProfile';
import LoadingElement from '../components/elements/LoadingElement';
import ErrorElement from '../components/elements/ErrorElement';
import { generateRandomAvatar } from '../utils';

function Todos() {
  const { allTodoQuery, isLoading, isError, refetch } = useAllTodos();
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('todo:', allTodoQuery);
  console.log('user:', user);

  const getDataTodo = Array.isArray(allTodoQuery)
    ? allTodoQuery.map((item) => {
        const createdAt = item.created_at;
        let date = new Date();

        if (createdAt && createdAt.seconds) {
          date = new Date(createdAt.seconds * 1000);
        }

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
      <div className="flex items-center justify-between px-2 pb-4">
        <h2>Recent Todo</h2>
        <p className="underline text-gray-500 text-sm">See all</p>
      </div>
      {isLoading && <LoadingElement />}
      {isError && <ErrorElement />}

      <div className="flex flex-col gap-5 mb-10">
        {getDataTodo.length > 0 ? (
          getDataTodo.map((ev) => {
            const { id, title, status, description, formattedDate, author } = ev;

            return (
              <Card key={id} className="bg-white py-5 px-3 hover:bg-[#F9F9F9] border border-gray-400 rounded-lg drop-shadow-md transition duration-300 ease-in-out">
                <Card.Header className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[15px] font-semibold text-gray-800">{title}</h2>
                    <p className="text-[12px] text-gray-500">{description}</p>
                  </div>
                  <p
                    className={`text-xs font-medium px-4 py-2 rounded-full 
                    ${status === 'complete' ? 'bg-green-100 text-green-800' : status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {status === 'complete' ? 'Complete' : status === 'pending' ? 'Pending' : 'Archived'}
                  </p>
                </Card.Header>

                <div className="flex justify-between items-center pt-3">
                  <Card.Body className="flex items-center gap-2">
                    <img src={generateRandomAvatar()} className="rounded-full w-6 h-6" />
                    <p className="text-xs text-gray-600">{author}</p>
                  </Card.Body>
                  <Card.Footer>
                    <p className="text-xs text-gray-500">{formattedDate}</p>
                  </Card.Footer>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-center">No Todos</p>
        )}
      </div>
    </div>
  );
}

export default Todos;
