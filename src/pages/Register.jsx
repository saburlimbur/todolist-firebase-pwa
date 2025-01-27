import React from 'react';
import AuthTemplate from '../components/template/AuthTemplate';
import { useFormik } from 'formik';
import { useState } from 'react';
import usersSchema from '../service/usersSchema';
import googleIcon from '../assets/google-icon-logo-svgrepo-com.svg';
import Button from '../components/elements/Button';
import { createUserWithEmail, createUserWithGoogle } from '../service/userService';
import { useNavigate } from 'react-router-dom';
import InputFields from '../components/fragments/InputFields';

function Register() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [renderForm, setRenderForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: usersSchema,
    onSubmit: async (values) => {
      console.log('data:', values);

      try {
        setIsLoading(true);
        await createUserWithEmail(values.email, values.password);
        setIsLoading(false);
        // navigate('/login');
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        console.error('Terjadi kesalahan saat login:', error);
      }
    },
  });

  const onModalGoogle = async () => {
    try {
      setIsLoading(true);
      await createUserWithGoogle();

      navigate('/todoboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error signing up with Google: ', error);
    }
  };

  return (
    <AuthTemplate 
      title="Sign up here!" 
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      type="register"
      >
      <section className="max-w-[500px] m-auto">
        <div className="flex flex-col gap-4">
          <Button
            className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
            type="button"
            onClick={onModalGoogle}
            disabled={loading}
          >
            <img src={googleIcon} className="w-4 h-4 mr-3" />
            {loading ? 'Signing up...' : 'Sign up with Google'}
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
                  <InputFields 
                    htmlFor="username" 
                    label="username" 
                    type="username" 
                    name="username" 
                    id="username" 
                    placeholder="Masukkan username" 
                    value={formik.values.username} 
                    onBlur={formik.handleBlur} 
                    onChange={formik.handleChange} 
                    />
                  {formik.errors.username && formik.touched.username && <p className="text-red-500 text-xs">{formik.errors.username}</p>}
                </div>

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
                  type="button"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Sign Up'}
                </Button>
              </form>
            </div>
          ) : (
            <Button
              className="w-full text-[#1a1a2e] bg-white border border-gray-300 hover:border-gray-300 text-sm py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
              type="submit"
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
