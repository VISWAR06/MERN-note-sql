import React from 'react';
import {Link} from 'react-router-dom'
const Register = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold text-center mb-6">Register</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text" 
            placeholder="Contact (optional)" 
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-black text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
          <p className='px-4 text-center'>Already have an account? <Link to='/login' className='text-blue-500'>sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
