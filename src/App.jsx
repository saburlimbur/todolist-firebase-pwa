import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Register from './pages/Register';
import Todos from './pages/Todos';
import NotFound404 from './pages/NotFound404';
import Login from './pages/Login';
import AppLayouts from './components/layouts/AppLayouts';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.apiKey) {
    toast.error('Please log in to access this page');
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.apiKey) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, []);

  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<AppLayouts />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/todoboard"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
