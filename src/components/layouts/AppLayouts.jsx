import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../fragments/Modal';
import FormsTodo from '../template/FormsTodo';
import { useAllTodos } from '../../hooks/useTodos';
import MenuBottom from '../fragments/MenuBottom';

function AppLayouts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetch } = useAllTodos();
  const user = JSON.parse(localStorage.getItem('user'));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isUserValid = user && user.apiKey;

  return (
    <main className="flex flex-col min-h-screen pb-16">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {isUserValid ? (
        <MenuBottom onClick={openModal} />
      ) : (
        <div></div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormsTodo refetch={refetch} />
      </Modal>
    </main>
  );
}

export default AppLayouts;
