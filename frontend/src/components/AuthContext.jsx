import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true,
        });
        setCurrentUser(res.data);
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      const res = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || 'Login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      setCurrentUser(null);
      window.location.href = '/login';
    } catch (e) {
      console.log(e.message);
      setCurrentUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};