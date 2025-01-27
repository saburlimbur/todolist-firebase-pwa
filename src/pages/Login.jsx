import React, { useState } from 'react';
import AuthTemplate from '../components/template/AuthTemplate';
import { useFormik } from 'formik';
import usersSchema from '../service/usersSchema';
import InputFields from '../components/fragments/InputFields';
import Button from '../components/elements/Button';
import googleIcon from '../assets/google-icon-logo-svgrepo-com.svg';
import { loginUserWithEmail, loginUserWithGoogle } from '../service/userService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: usersSchema,
    onSubmit: async (values) => {
      console.log('data:', values);

      try {
        setIsLoading(true);
        await loginUserWithEmail(values.email, values.password);
        setIsLoading(false);
        navigate("/todoboard");
      } catch (error) {
        setIsLoading(false);
        console.error('Error during login: ', error);
      }
    },
  });

  const onModalGoogle = async () => {
    try {
      setIsLoading(true);
      await loginUserWithGoogle();

      navigate('/todoboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error signing up with Google: ', error);
    }
  };

  return (
    <AuthTemplate 
      title="Sign in here!" 
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      type="login"
      >
      <section className="max-w-[500px] m-auto">
        <div className="flex flex-col gap-4">
          <Button
            className="w-full text-[#1a1a2e] bg-white border border-gray-300 hover:border-gray-300 text-sm py-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ease-in font-semibold"
            type="button"
            onClick={onModalGoogle}
            disabled={loading}
          >
            <img src={googleIcon} className="w-4 h-4 mr-3" />
            {loading ? 'Signing up...' : 'Sign up with Google'}
          </Button>

          <div className="flex items-center gap-3">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm font-medium">or sign in with email</span>
            <hr className="flex-grow border-gray-300" />
          </div>
        </div>

        <div className="pt-8">
          <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
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
              {formik.errors.email && formik.touched.email && (<p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
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
              {formik.errors.password && formik.touched.password && (<p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>

            <Button
            className="w-full bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 text-sm hover:text-white py-4 rounded-full font-medium flex items-center justify-center cursor-pointer transition-colors ease-in"
            type="button"
          >
           {loading ? 'Logging in...' : 'Sign In'}
          </Button>
          </form>
        </div>
      </section>
    </AuthTemplate>
  );
}

export default Login;
