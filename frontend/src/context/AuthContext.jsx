import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('w2w_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    if (user?.email) {
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [token, user?.email]);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/profile');
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.warn('Profile refresh is unavailable right now, keeping the session intact:', err);
      if (!user) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (authData) => {
    localStorage.setItem('w2w_token', authData.token);
    setToken(authData.token);
    setUser({
      id: authData.id,
      name: authData.name,
      email: authData.email,
      role: authData.role,
      greenPoints: authData.greenPoints,
      impactScore: authData.impactScore
    });
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('w2w_token');
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (token) {
      await fetchProfile();
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      refreshProfile,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'ROLE_ADMIN',
      isCollector: user?.role === 'ROLE_COLLECTOR' || user?.role === 'ROLE_ADMIN'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
