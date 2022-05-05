import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@InvesTinder:token');
    const user = localStorage.getItem('@InvesTinder:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@InvesTinder:token');
    localStorage.removeItem('@InvesTinder:user');

    setData({});
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@InvesTinder:token', token);
    localStorage.setItem('@InvesTinder:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve estar dentro do AuthProvider');
  }

  return context;
}
