import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import SearchBar from '../components/SearchBar';
import colors from '../constants/colors';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { INITIAL_AVISOS } from '../data/avisos';

export default function AvisosScreen() {
  const { user, loadingAuth } = useAuth();
  const { avisosLidos, toggleAvisoLido, loadingData } = useAppData();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/login');
    }
  }, [loadingAuth, user]);

  const filteredAvisos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return INITIAL_AVISOS;
    }

    return INITIAL_AVISOS.filter(aviso => {
      const searchableContent = [
        aviso.title,
        aviso.category,
        aviso.description,
        aviso.date,
      ]
        .join(' ')
        .toLowerCase();

      return searchableContent.includes(normalizedSearch);
    });
  }, [search]);

  if (loadingAuth || loadingData || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando avisos...</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Avisos</Text>
      <Text style={styles.subtitle}>
        Consulte comunicados importantes e marque os itens já lidos. A busca funciona em tempo real.
      </Text>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por título, categoria ou data..."
      />

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>
          {avisosLidos.length} de {INITIAL_AVISOS.length} avisos marcados como lidos
        </Text>
      </View>

      {filteredAvisos.length === 0 ? (
        <EmptyState
          title="Nenhum aviso encontrado"
          description="Tente buscar por avaliação, documentação, entrega ou outra palavra-chave."
        />
      ) : (
        <View style={styles.list}>
          {filteredAvisos.map(aviso => {
            const isRead = avisosLidos.includes(aviso.id);

            return (
              <View style={[styles.card, isRead && styles.readCard]} key={aviso.id}>
                <View style={styles.cardHeader}>
                  <Text style={styles.category}>{aviso.category}</Text>
                  <Text style={styles.date}>
                    {new Date(aviso.date).toLocaleDateString('pt-BR')}
                  </Text>
                </View>

                <Text style={styles.cardTitle}>{aviso.title}</Text>
                <Text style={styles.cardDescription}>{aviso.description}</Text>

                <Pressable
                  style={[styles.readButton, isRead && styles.readButtonActive]}
                  onPress={() => toggleAvisoLido(aviso.id)}
                >
                  <Text style={[styles.readButtonText, isRead && styles.readButtonTextActive]}>
                    {isRead ? 'Lido' : 'Marcar como lido'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.backButton}>
        <PrimaryButton title="Voltar para Home" onPress={() => router.push('/')} variant="outline" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.mutedText,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  statsBox: {
    backgroundColor: '#fff0f5',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffd1df',
  },
  statsText: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 14,
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  readCard: {
    borderColor: colors.success,
    backgroundColor: '#f3fbf5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  category: {
    backgroundColor: colors.dark,
    color: colors.light,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  date: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  cardDescription: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  readButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  readButtonActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  readButtonText: {
    color: colors.primary,
    fontWeight: '900',
  },
  readButtonTextActive: {
    color: colors.light,
  },
  backButton: {
    marginTop: 24,
  },
});