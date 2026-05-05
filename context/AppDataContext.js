import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { INITIAL_POSTS } from '../data/posts';

const AppDataContext = createContext({});

const DEFAULT_DATA = {
  mensagensEmpresa: [],
  comentarios: INITIAL_POSTS,
  avisosLidos: [],
  eventosFavoritos: [],
};

export function AppDataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loadingData, setLoadingData] = useState(true);

  async function persistData(nextData) {
    setData(nextData);
    await AsyncStorage.setItem(STORAGE_KEYS.APP_DATA, JSON.stringify(nextData));
  }

  async function loadData() {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEYS.APP_DATA);

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        setData({
          ...DEFAULT_DATA,
          ...parsedData,
          comentarios: parsedData.comentarios?.length
            ? parsedData.comentarios
            : DEFAULT_DATA.comentarios,
        });
      }
    } catch (error) {
      console.log('Erro ao carregar dados do app:', error);
    } finally {
      setLoadingData(false);
    }
  }

  async function addMensagemEmpresa({ subject, message, userName }) {
    const newMessage = {
      id: String(Date.now()),
      subject: subject.trim(),
      message: message.trim(),
      userName,
      createdAt: new Date().toISOString(),
    };

    const nextData = {
      ...data,
      mensagensEmpresa: [newMessage, ...data.mensagensEmpresa],
    };

    await persistData(nextData);

    return newMessage;
  }

  async function addComentario({ author, message }) {
    const newComment = {
      id: String(Date.now()),
      author,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextData = {
      ...data,
      comentarios: [newComment, ...data.comentarios],
    };

    await persistData(nextData);

    return newComment;
  }

  async function toggleAvisoLido(avisoId) {
    const alreadyRead = data.avisosLidos.includes(avisoId);

    const nextData = {
      ...data,
      avisosLidos: alreadyRead
        ? data.avisosLidos.filter(id => id !== avisoId)
        : [...data.avisosLidos, avisoId],
    };

    await persistData(nextData);
  }

  async function toggleEventoFavorito(eventoId) {
    const alreadyFavorite = data.eventosFavoritos.includes(eventoId);

    const nextData = {
      ...data,
      eventosFavoritos: alreadyFavorite
        ? data.eventosFavoritos.filter(id => id !== eventoId)
        : [...data.eventosFavoritos, eventoId],
    };

    await persistData(nextData);
  }

  useEffect(() => {
    loadData();
  }, []);

  const value = useMemo(() => {
    return {
      loadingData,
      mensagensEmpresa: data.mensagensEmpresa,
      comentarios: data.comentarios,
      avisosLidos: data.avisosLidos,
      eventosFavoritos: data.eventosFavoritos,
      addMensagemEmpresa,
      addComentario,
      toggleAvisoLido,
      toggleEventoFavorito,
    };
  }, [data, loadingData]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}