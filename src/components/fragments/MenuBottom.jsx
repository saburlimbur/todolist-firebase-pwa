import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../elements/Button';
import { User, Plus, Home } from 'lucide-react';

const menu = [
  {
    id: 1,
    path: '/todoboard',
    name: 'Home',
    icon: <Home size={24} />,
  },
  {
    id: 2,
    name: 'Create todo',
    icon: <Plus size={24} />,
  },
  {
    id: 3,
    path: '/profile',
    name: 'Profile',
    icon: <User size={24} />,
  },
];

function MenuBottom({ onClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/100 text-[#1a1a2e] py-2 shadow-lg border-t-2 border-gray-300 z-10">
      <div className="flex justify-center gap-24 py-3">
        {menu.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {item.path ? (
              <Link to={item.path}>
                <Button className="flex flex-col items-center cursor-pointer" onClick={item.name === 'Create todo' ? onClick : undefined}>
                  {item.icon}
                </Button>
              </Link>
            ) : (
              <Button className="flex flex-col items-center cursor-pointer" onClick={onClick}>
                {item.icon}
              </Button>
            )}
            <span className="text-xs pt-1">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBottom;
