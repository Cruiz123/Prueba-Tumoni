// src/context/AuthContext.tsx
import React ,{ createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/api.types';
import { STORAGE_KEY } from '../utils/constants';

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
}

// eslint-disable-next-line prettier/prettier
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY.user,);
      const storedToken = await AsyncStorage.getItem(STORAGE_KEY.token,);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    };

    loadStorageData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const signIn = async (token: string, user: User) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    await AsyncStorage.setItem(STORAGE_KEY.user, JSON.stringify(user));
    await AsyncStorage.setItem(STORAGE_KEY.token, token);
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem(STORAGE_KEY.user);
    await AsyncStorage.removeItem(STORAGE_KEY.token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
