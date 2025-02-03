import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import Register from './pages/Register';
import Todos from './pages/Todos';
import NotFound404 from './pages/NotFound404';
import Login from './pages/Login';
import AppLayouts from './components/layouts/AppLayouts';
import Profile from './pages/Profile';
import { useState } from 'react';

function ProtectedRoute() {
  // const authenticated =
}

function App() {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<AppLayouts />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todoboard" element={<Todos />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
