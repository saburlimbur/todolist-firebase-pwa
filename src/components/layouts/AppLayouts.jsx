import { User, Home } from 'lucide-react';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Button from '../elements/Button';
import { Plus } from 'lucide-react';
import FormsTodo from '../template/FormsTodo';
import Modal from '../fragments/Modal';
import { useState } from 'react';
import { useAllTodos } from '../../hooks/useTodos';

function AppLayouts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetch } = useAllTodos();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/100 text-[#1a1a2e] py-2 shadow-lg border-t-2 border-gray-300 z-10">
        <div className="flex justify-center gap-24 py-3">
          <Link to="/todoboard" className="flex flex-col items-center">
            <Home size={24} />
            <span className="text-xs pt-1">Home</span>
          </Link>

          <Button className="flex flex-col items-center" onClick={openModal}>
            <Plus className="p-1 bg-gray-200 rounded-full" size={30} />
            <span className="text-xs pt-1">Create todo</span>
          </Button>

          <Link to="/profile" className="flex flex-col items-center">
            <User size={24} />
            <span className="text-xs pt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* by props*/}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormsTodo refetch={refetch} />
      </Modal>
    </main>
  );
}

export default AppLayouts;
