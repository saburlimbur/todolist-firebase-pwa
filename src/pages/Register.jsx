import React from 'react';
import AuthTemplate from '../components/template/AuthTemplate';
import { useFormik } from 'formik';
import { useState } from 'react';
import googleIcon from '../assets/google-icon-logo-svgrepo-com.svg';
import InputFields from '../components/fragments/InputFields';
import { registerUserSchema } from '../service/usersSchema';
import Button from '../components/elements/Button';
import { createUserWithGoogle } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmail } from '../hooks/useUsers';
import { signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import Loaders from '../components/elements/Loaders';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });
  const [renderForm, setRenderForm] = useState(false);
  const { createUserWithEmailMutation } = useCreateUserWithEmail();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerUserSchema,
    onSubmit: async (values) => {
      setLoading((prev) => ({ ...prev, email: true }));
      createUserWithEmailMutation(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            setLoading((prev) => ({ ...prev, email: false }));
            navigate('/');
          },
          onError: (error) => {
            setLoading((prev) => ({ ...prev, email: false }));
            console.error('Terjadi kesalahan saat register:', error);
          },
        }
      );
    },
  });

  const onModalGoogle = async () => {
    try {
      setLoading((prev) => ({ ...prev, google: true }));
      await createUserWithGoogle();
      setLoading((prev) => ({ ...prev, google: false }));
      navigate('/todoboard');
    } catch (error) {
      setLoading((prev) => ({ ...prev, google: false }));
      console.error('Error signing up with Google: ', error);
    }
  };

  return (
    <AuthTemplate title="Sign up here!" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." type="register">
      <section className="max-w-[500px] m-auto">
        <div className="flex flex-col gap-4">
          <Button
            className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
            type="button"
            onClick={onModalGoogle}
            disabled={loading.google}
          >
            <img src={googleIcon} className="w-4 h-4 mr-3" />
            {loading.google ? 'Signing up...' : 'Sign up with Google'}
          </Button>

          <div className="flex items-center gap-3">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm font-medium">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {renderForm ? (
            <div className="pt-8">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div>
                  <InputFields htmlFor="username" label="Username" type="text" name="username" id="username" placeholder="Masukkan username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  {formik.errors.username && formik.touched.username && <p className="text-red-500 text-xs">{formik.errors.username}</p>}
                </div>

                <div>
                  <InputFields htmlFor="email" label="Email" type="email" name="email" id="email" placeholder="Masukkan email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs">{formik.errors.email}</p>}
                </div>

                <div>
                  <InputFields htmlFor="password" label="Password" type="password" name="password" id="password" placeholder="Masukkan password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  {formik.errors.password && formik.touched.password && <p className="text-red-500 text-xs">{formik.errors.password}</p>}
                </div>

                <Button
                  className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
                  type="submit"
                  disabled={loading.email}
                >
                  {loading.email ? <Loaders /> : 'Sign Up'}
                </Button>
              </form>
            </div>
          ) : (
            <Button
              className="w-full text-[#1a1a2e] bg-white border border-gray-300 hover:border-gray-300 text-sm py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
              type="button"
              onClick={() => setRenderForm(true)}
            >
              Continue with email
            </Button>
          )}
        </div>
      </section>
    </AuthTemplate>
  );
}

export default Register;
