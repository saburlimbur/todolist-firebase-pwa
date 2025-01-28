import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import Button from '../elements/Button';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logoutUser = () => {
    const confirmed = window.confirm('Anda yakin ingin keluar?');
    if (confirmed) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.clear();

          Notiflix.Notify.success('User logged-out successfully!');
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
    <div>
      <h2>{user?.email}</h2>

      <Button className="mt-y bg-[#1a1a2e] py-2 px-3 text-white cursor-pointer" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
