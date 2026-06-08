import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      // For now, just set a mock user
      setUser({ id: 1, username: 'User' });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Call your login API
    const token = 'mock-token';
    localStorage.setItem('token', token);
    setUser({ id: 1, email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (username, email, password) => {
    // Call your registration API
    console.log('Register:', { username, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
