import React from 'react';
import todoSchema from './../../service/todoSchema';
import InputFields from '../fragments/InputFields';
import Button from '../elements/Button';
import SelectOption from '../elements/SelectOption';
import { useCreateTodos } from '../../hooks/useTodos';
import TextArea from '../elements/TextArea';
import { useFormik } from 'formik';
import { useState } from 'react';

function FormsTodo({ onClose, refetch }) {
  const [loading, setLoading] = useState(false);
  const { createTodoMutation, onSuccess, onError } = useCreateTodos();

  const formik = useFormik({
    initialValues: {
      author: '',
      title: '',
      status: '',
      description: '',
    },
    validationSchema: todoSchema,
    onSubmit: async (values) => {
      console.log('test', values);

      setLoading(true);

      try {
        await createTodoMutation({
          author: values.author,
          title: values.title,
          status: values.status,
          description: values.description,
        });

        refetch();

        onClose();

        setLoading(false);
      } catch (error) {
        onClose();
        setLoading(false);
        console.log('Error creating todo:', error);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="py-5 flex flex-col gap-3">
          <div>
            <InputFields htmlFor="author" label="Author Name" type="text" id="author" placeholder="Masukan author samaran" name="author" value={formik.values.author} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.errors.author && formik.touched.author && <p className="text-red-500 text-xs">{formik.errors.author}</p>}
          </div>

          <div>
            <InputFields htmlFor="title" label="Title" type="text" id="title" placeholder="Masukan title" name="title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.errors.title && formik.touched.title && <p className="text-red-500 text-xs">{formik.errors.title}</p>}
          </div>

          <div>
            <SelectOption
              name="status"
              title="Status"
              id="status"
              className="mb-3 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer text-gray-500 text-sm"
              label="Pilih status"
              value={formik.values.status}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={[
                { value: 'archive', label: 'Archive' },
                { value: 'complete', label: 'Complete' },
                { value: 'pending', label: 'Pending' },
              ]}
            />
            {formik.errors.status && formik.touched.status && <p className="text-red-500 text-xs">{formik.errors.status}</p>}
          </div>

          <div>
            <TextArea
              name="description"
              id="description"
              title="Description"
              className="mb-3 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer text-sm"
              placeholder="Masukan description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.description && formik.touched.description && <p className="text-red-500 text-xs">{formik.errors.description}</p>}
          </div>
        </div>

        <Button
          className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Created todo 🚀' : 'Submit Todo'}
        </Button>
      </form>
    </div>
  );
}

export default FormsTodo;
