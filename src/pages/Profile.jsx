import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import Button from '../components/elements/Button';
import Card from '../components/fragments/Card';
import { Pencil } from 'lucide-react';
import { useGetTodoByUserId } from '../hooks/useTodos';
import LoadingElement from '../components/elements/LoadingElement';
import ErrorElement from '../components/elements/ErrorElement';
import { format } from 'date-fns';

function Profile() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const currentUser = getAuth().currentUser;

  // mengembil UID dari Authentication, lalu di relasikan pada field collection todo dgn field userId
  const { getTodoUserId, isLoading, isError } = useGetTodoByUserId(currentUser?.uid);
  const getTodoUid = Array.isArray(getTodoUserId)
    ? getTodoUserId.map((item) => {
        const createdAt = item.created_at;
        let date = new Date();

        if (createdAt && createdAt.seconds) {
          date = new Date(createdAt.seconds * 1000);
        }

        return {
          ...item,
          formattedDate: format(date, 'yyyy-MM-dd'),
        };
      })
    : [];
  console.log('getTodoUserId', getTodoUserId);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutUser = () => {
    const confirmed = window.confirm('Anda yakin ingin keluar?');
    if (confirmed) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.clear();

          Notiflix.Notify.success('Yeay! Berhasil logout 🎉');
          navigate('/register');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
          Notiflix.Notify.failure('Error during logout. Please try again.');
        });
    }
    return;
  };

  return (
    <div className="w-full max-w-4xl sm:max-w-xl mx-auto py-5 px-4">
      <Card className="flex items-center justify-center flex-col relative">
        <Card.Header className="flex justify-center relative">
          <img src={user?.photoURL || `https://api.multiavatar.com/${encodeURIComponent(user?.uid)}.svg`} className="w-36 h-3w-36 border-2 border-gray-200 rounded-full p-1" />

          <div className="absolute bottom-0 right-0 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer w-8 h-10 mr-2 mt-2">
            <Pencil size={28} className="p-2" />
          </div>
        </Card.Header>
        <Card.Body className="flex flex-col items-center py-4">
          <h1 className="text-xl font-semibold">{user?.displayName || user?.email}</h1>
          <p className="text-sm text-gray-600">{user?.email || ''}</p>
          <h3 className="text-xs font-medium text-gray-500 pt-3">Your daily adventure starts now</h3>
        </Card.Body>
        <Card.Footer className="flex flex-col gap-2">
          <Button className="mt-y bg-[#1a1a2e] py-3 px-5 text-white cursor-pointer rounded-lg text-sm" onClick={logoutUser}>
            Logout
          </Button>
        </Card.Footer>
      </Card>

      {/* todo uid */}
      <div className="w-full">
        <div className="flex items-center justify-between px-2 pb-4">
          <h2>Your todo</h2>
          <p className="underline text-gray-500 text-sm">See all</p>
        </div>
        {isLoading && <LoadingElement />}
        {isError && <ErrorElement />}

        <div className="flex flex-col gap-5 mb-10">
          {getTodoUid.length > 0 ? (
            getTodoUid.map((ev) => {
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
                      <img src={`https://api.multiavatar.com/${encodeURIComponent(author)}.svg`} className="rounded-full w-6 h-6" />
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
            <p>Your todos found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
