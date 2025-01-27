import * as yup from 'yup';

const usersSchema = yup.object().shape({
  username: yup.string().min(3, 'Username minimal 3 karakter').max(25, 'Username maksimal 25 karakter').required('Username wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(3, 'Password minimal 3 karakter').required('Password wajib diisi'),
});

export default usersSchema;
