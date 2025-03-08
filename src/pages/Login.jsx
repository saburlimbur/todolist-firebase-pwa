import React from 'react';
import { useState } from 'react';
import AuthTemplate from '../components/template/AuthTemplate';
import { useFormik } from 'formik';
import InputFields from '../components/fragments/InputFields';
import Button from '../components/elements/Button';
import googleIcon from '../assets/google-icon-logo-svgrepo-com.svg';
import { loginUserWithGoogle } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import { loginUserSchema } from '../service/usersSchema';
import { useLoginUserWithEmail } from '../hooks/useUsers';
import Loaders from '../components/elements/Loaders';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    email: false,
    google: false,
  });
  const { loginUserWithEmailMutation } = useLoginUserWithEmail();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      setLoading((prev) => ({ ...prev, email: true }));

      loginUserWithEmailMutation(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            setLoading((prev) => ({ ...prev, email: false }));
            navigate('/todoboard');
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
      await loginUserWithGoogle();
      setLoading((prev) => ({ ...prev, google: false }));
      navigate('/todoboard');
    } catch (error) {
      setLoading((prev) => ({ ...prev, google: false }));
      console.error('Error signing up with Google: ', error);
    }
  };

  return (
    <AuthTemplate title="Sign up here!" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit" type="login">
      <section className="max-w-[500px] m-auto">
        <div className="flex flex-col gap-4">
          <Button
            className="w-full text-[#1a1a2e] bg-white border border-gray-300 hover:border-gray-300 text-sm py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
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

          <div className="pt-8">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div>
                <InputFields 
                  htmlFor="email" 
                  label="Email" 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Masukkan email" 
                  value={formik.values.email} 
                  onBlur={formik.handleBlur} 
                  onChange={formik.handleChange} 
                  />
                {formik.errors.email && formik.touched.email && <p className="text-red-500 text-xs">{formik.errors.email}</p>}
              </div>

              <div>
                <InputFields 
                  htmlFor="password" 
                  label="Password" 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Masukkan password" 
                  value={formik.values.password} 
                  onBlur={formik.handleBlur} 
                  onChange={formik.handleChange} 
                  />
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
        </div>
      </section>
    </AuthTemplate>
  );
}

export default Login;
