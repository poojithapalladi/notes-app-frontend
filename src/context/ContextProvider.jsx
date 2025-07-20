import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const authContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const login = (u) => setUser(u);
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Verify token on mount
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setChecking(false);
        return;
      }
      try {
        const res = await api.get('/api/auth/verify');
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.log('verify error', err);
        logout();
      } finally {
        setChecking(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout, checking }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
export default ContextProvider;
