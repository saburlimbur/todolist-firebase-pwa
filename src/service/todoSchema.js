import * as yup from 'yup';

const todoSchema = yup.object().shape({
  id: yup.string().required('ID wajib diisi'),
  title: yup.string().required('Title wajib diisi'),
  description: yup.string().required('Description wajib diisi'),
  //   priority: yup.string().required('Priority wajib diisi'),
  status: yup
    .object()
    .shape({
      archive: yup.boolean().required('Archive status wajib diisi'),
      pending: yup.boolean().required('Pending status wajib diisi'),
      complete: yup.boolean().required('Complete status wajib diisi'),
    })
    .required('Status wajib diisi'),
});

export default todoSchema;
