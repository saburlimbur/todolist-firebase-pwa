import { User, Home } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AppLayouts() {
  return (
    <main className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/100 text-[#1a1a2e] py-2 shadow-lg border-t-2 border-gray-300 z-10">
        <div className="flex justify-center gap-40 py-3">
          <Link to="/todoboard" className="flex flex-col items-center">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center">
            <User size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AppLayouts;
