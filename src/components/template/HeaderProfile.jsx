import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../fragments/Card';
import { Pencil } from 'lucide-react';

function HeaderProfile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex items-center justify-between w-full max-w-xl bg-gray-100 py-3 px-2 rounded-xl">
      <Card className="flex items-center gap-2">
        <Card.Header className="flex justify-center">
          <img src={user?.photoURL || `https://api.multiavatar.com/${encodeURIComponent(user?.uid)}.svg`} className="w-14 h-14 border-2 border-gray-200 rounded-full p-1" />
        </Card.Header>
        <Card.Body className="flex flex-col gap-1">
          <h1 className="text-sm font-semibold">{user?.displayName || user?.email}</h1>
          <h3 className="text-xs font-medium text-gray-500">Your daily adventure starts now</h3>
        </Card.Body>
      </Card>
      <div className="flex items-center justify-center bg-gray-200 rounded-full cursor-pointer w-10 h-10 ml-auto">
        <Pencil size={28} className="p-2" />
      </div>
    </div>
  );
}

export default HeaderProfile;
