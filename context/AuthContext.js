import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';

const AuthContext = createContext({});

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  async function getStoredUsers() {
    const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  async function saveUsers(users) {
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  async function register({ name, email, password }) {
    const users = await getStoredUsers();
    const normalizedEmail = normalizeEmail(email);

    const alreadyExists = users.some(
      storedUser => normalizeEmail(storedUser.email) === normalizedEmail
    );

    if (alreadyExists) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const newUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];

    await saveUsers(updatedUsers);
    await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(newUser));

    setUser(newUser);

    return newUser;
  }

  async function login({ email, password }) {
    const users = await getStoredUsers();
    const normalizedEmail = normalizeEmail(email);

    const foundUser = users.find(
      storedUser =>
        normalizeEmail(storedUser.email) === normalizedEmail &&
        storedUser.password === password
    );

    if (!foundUser) {
      throw new Error('E-mail ou senha inválidos.');
    }

    await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(foundUser));
    setUser(foundUser);

    return foundUser;
  }

  async function logout() {
    await AsyncStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
  }

  async function loadSession() {
    try {
      const storedSession = await AsyncStorage.getItem(STORAGE_KEYS.SESSION);

      if (storedSession) {
        setUser(JSON.parse(storedSession));
      }
    } catch (error) {
      console.log('Erro ao carregar sessão:', error);
    } finally {
      setLoadingAuth(false);
    }
  }

  useEffect(() => {
    loadSession();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      loadingAuth,
      register,
      login,
      logout,
    };
  }, [user, loadingAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}