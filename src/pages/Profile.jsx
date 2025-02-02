import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import Button from '../components/elements/Button';
import Card from '../components/fragments/Card';
import { Pencil } from 'lucide-react';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

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
    <div className="w-full max-w-4xl sm:max-w-xl mx-auto py-10 px-4">
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
    </div>
  );
}

export default Profile;
