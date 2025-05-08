
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;