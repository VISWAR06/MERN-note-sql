

import { Link } from 'react-router-dom';

const Navbar = () => {
   
  return (
    <nav className='flex justify-between bg-gradient-to-r from-blue-700 to to-blue-300 text-white p-4'>
      <div>
        <Link to="/" className='underline decoration-cyan-500'>Note App</Link>
      </div>
      <div className='flex gap-4 px-4'>
        <Link to="/login"className='underline decoration-cyan-500'>Login</Link>
        <Link to="/register"className='underline decoration-cyan-500'>Register</Link>
        <Link to="/dashboard"className='underline decoration-cyan-500'>Dashboard</Link>
        <Link to="/profile"className='underline decoration-cyan-500'>Profile</Link> 
        <button >logout</button> 
      </div>
    </nav>
  );
}

export default Navbar;
