
import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
<Route path='/dashboard' element={<Dashboard/>} />
<Route path='/register' element={<Register/>} />
<Route path='/login' element={<Login/>} />
<Route path='/profile' element={<Profile/>} />
<Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
