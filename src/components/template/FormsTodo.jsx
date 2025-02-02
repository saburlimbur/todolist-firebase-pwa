import React from 'react';
import todoSchema from './../../service/todoSchema';
import InputFields from '../fragments/InputFields';
import Button from '../elements/Button';
import SelectOption from '../elements/SelectOption';
import { useCreateTodos } from '../../hooks/useTodos';

function FormsTodo() {
  const { createTodoMutation, isSuccess, onError } = useCreateTodos();
  const handleCreateTodo = async (ev) => {
    ev.preventDefault();

    const title = ev.target.title.value;
    const description = ev.target.description.value;
    const status = ev.target.status.value;

    if (!title || !description || !status) {
      alert('Isi semua input terlebih dahulu!');
      return;
    }

    const newTodo = {
      title,
      description,
      status,
    };

    try {
      await createTodoMutation(newTodo);
      ev.target.reset();
    } catch (error) {
      console.log('Error creating todo:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateTodo}>
        <div className="py-5">
          <InputFields htmlFor="title" label="Title" type="text" id="title" placeholder="Masukan title" />

          <InputFields htmlFor="description" label="Description" type="text" id="description" placeholder="Masukan description" />

          <SelectOption
            name="status"
            title="Status"
            id="status"
            className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer text-gray-500 text-sm"
            label="Pilih status"
            options={[
              { value: 'archive', label: 'Archive' },
              { value: 'complete', label: 'Complete' },
              { value: 'pending', label: 'Pending' },
            ]}
          />
        </div>

        <Button className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in" type="submit">
          Submit Todo
        </Button>
      </form>
    </div>
  );
}

export default FormsTodo;
