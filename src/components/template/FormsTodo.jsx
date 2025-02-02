import React from 'react';
import todoSchema from './../../service/todoSchema';
import InputFields from '../fragments/InputFields';
import Button from '../elements/Button';
import SelectOption from '../elements/SelectOption';
import { useCreateTodos } from '../../hooks/useTodos';
import TextArea from '../elements/TextArea';

function FormsTodo() {
  const { createTodoMutation, isSuccess, onError } = useCreateTodos();
  const handleCreateTodo = async (ev) => {
    ev.preventDefault();

    const title = ev.target.title.value;
    const description = ev.target.description.value;
    const status = ev.target.status.value;
    const author = ev.target.author.value;

    if (!title || !description || !status || !author) {
      alert('Isi semua input terlebih dahulu!');
      return;
    }

    const newTodo = {
      title,
      description,
      status,
      author,
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
          <InputFields htmlFor="author" label="Author Name" type="text" id="author" placeholder="Masukan author samaran" />

          <InputFields htmlFor="title" label="Title" type="text" id="title" placeholder="Masukan title" />

          <SelectOption
            name="status"
            title="Status"
            id="status"
            className="mb-3 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer text-gray-500 text-sm"
            label="Pilih status"
            options={[
              { value: 'archive', label: 'Archive' },
              { value: 'complete', label: 'Complete' },
              { value: 'pending', label: 'Pending' },
            ]}
          />

          <TextArea name="description" id="description" title="Description" className="mb-3 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer text-sm" placeholder="Masukan description" />
        </div>

        <Button className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in" type="submit">
          Submit Todo
        </Button>
      </form>
    </div>
  );
}

export default FormsTodo;
