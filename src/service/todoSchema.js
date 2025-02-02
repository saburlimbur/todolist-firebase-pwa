import * as yup from 'yup';

const todoSchema = yup.object().shape({
  author: yup.string().required('Author wajib diisi'),
  title: yup.string().required('Title wajib diisi'),
  description: yup.string().required('Description wajib diisi'),
  //   priority: yup.string().required('Priority wajib diisi'),
  status: yup
    .string()
    .oneOf(['archive', 'pending', 'complete'], 'Status tidak valid') 
    .required('Status wajib diisi'),
});

export default todoSchema;
