import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiAdminLogin, fetchAdminMe } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('swaraj_admin_token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = await fetchAdminMe();
          setUser(userData);
        } catch (err) {
          console.error("Token verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    const data = await apiAdminLogin(username, password);
    localStorage.setItem('swaraj_admin_token', data.access_token);
    setToken(data.access_token);
    const userData = await fetchAdminMe();
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('swaraj_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
