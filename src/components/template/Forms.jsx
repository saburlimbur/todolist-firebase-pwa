import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useFormik } from 'formik';

import InputFields from '../fragments/InputFields';
import usersSchema from '../../service/usersSchema';
import Button from './../elements/Button';
import imageAuth from '../../assets/3d-hand-using-online-banking-app-smartphone-b.png';

function Forms({ onPrev, onNext }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: usersSchema,
    onSubmit: (values) => {
      console.log("data:", values);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onNext();
      }, 2000);
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-20 py-10">
      {/* Left */}
      <div className="flex items-center justify-center w-full lg:w-1/2 mb-8 lg:mb-0">
        <motion.img
          src={imageAuth}
          alt="Authentication Illustration"
          className="w-[50%] sm:w-[60%] md:w-[50%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]"
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: [0, -10, 10, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: { duration: 2, repeat: Infinity, repeatType: 'loop' },
            scale: { duration: 1 },
          }}
        />
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2">
        <form
          className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {isLogin ? 'Login' : 'Daftar sekarang'}
          </h2>

          {/* Conditional Rendering for Username (only on Register) */}
          {!isLogin && (
            <div className="mb-6">
              <InputFields
                htmlFor="username"
                label="Username"
                type="text"
                name="username"
                id="username"
                placeholder="Masukkan username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-red-500 text-xs">{formik.errors.username}</p>
              )}
            </div>
          )}

          <div className="mb-6">
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
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
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
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {isLogin ? 'Login' : 'Daftar'}
              {loading && <span>🚀</span>}
            </Button>
          </div>

          <div className="text-center py-2">
            <p className="text-sm">
              {isLogin ? (
                <>
                  Belum punya akun?{' '}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    Daftar
                  </span>
                </>
              ) : (
                <>
                  Sudah punya akun?{' '}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forms;
