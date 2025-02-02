import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import Register from './pages/Register';
import Todos from './pages/Todos';
import NotFound404 from './pages/NotFound404';
import Login from './pages/Login';

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todoboard" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
