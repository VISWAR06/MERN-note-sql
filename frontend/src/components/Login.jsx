import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (!res.success) {
      setErr(res.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>
        {err && <p className="text-red-600 text-center">{err}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-black text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
