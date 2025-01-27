import React from 'react';
import { Link } from 'react-router-dom';

function AuthTemplate({ title, children, subtitle, type }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-6 sm:p-10">
        {/* title */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-[#0d0c22]">{title}</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* content form */}
        <div className="mt-4">{children}</div>

        {/* conditional rendering */}
        <div className="flex items-center mt-6 justify-center">
          <p className="mr-2 text-sm text-gray-600">
            {type === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </p>

          {type === 'login' ? (
            <Link
              to="/register"
              className="text-[#1a1a2e] font-semibold text-sm hover:text-[#31314e] hover:underline transition-all ease-in duration-300"
            >
              Register
            </Link>
          ) : (
            <Link
            //   to="/login"
              to="/"
              className="text-[#1a1a2e] font-semibold text-sm hover:text-[#31314e] hover:underline transition-all ease-in duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default AuthTemplate;
