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
import { INITIAL_EVENTOS } from '../data/eventos';

export default function CalendarioScreen() {
  const { user, loadingAuth } = useAuth();
  const { eventosFavoritos, toggleEventoFavorito, loadingData } = useAppData();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/login');
    }
  }, [loadingAuth, user]);

  const filteredEventos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return INITIAL_EVENTOS;
    }

    return INITIAL_EVENTOS.filter(evento => {
      const searchableContent = [
        evento.title,
        evento.type,
        evento.description,
        evento.date,
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
        <Text style={styles.loadingText}>Carregando calendário...</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Calendário</Text>
      <Text style={styles.subtitle}>
        Busque eventos por nome, tipo ou data e favorite os momentos importantes do projeto.
      </Text>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar evento, entrega ou revisão..."
      />

      {filteredEventos.length === 0 ? (
        <EmptyState
          title="Nenhum evento encontrado"
          description="Tente buscar por entrega, revisão, planejamento ou uma data específica."
        />
      ) : (
        <View style={styles.timeline}>
          {filteredEventos.map(evento => {
            const isFavorite = eventosFavoritos.includes(evento.id);

            return (
              <View style={styles.eventCard} key={evento.id}>
                <View style={styles.timelineDot} />

                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.type}>{evento.type}</Text>
                    <Text style={styles.date}>
                      {new Date(evento.date).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>

                  <Text style={styles.eventTitle}>{evento.title}</Text>
                  <Text style={styles.eventDescription}>{evento.description}</Text>

                  <Pressable
                    style={[
                      styles.favoriteButton,
                      isFavorite && styles.favoriteButtonActive,
                    ]}
                    onPress={() => toggleEventoFavorito(evento.id)}
                  >
                    <Text
                      style={[
                        styles.favoriteButtonText,
                        isFavorite && styles.favoriteButtonTextActive,
                      ]}
                    >
                      {isFavorite ? '★ Favorito' : '☆ Favoritar'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.backButton}>
        <PrimaryButton
          title="Voltar para Home"
          onPress={() => router.push('/')}
          variant="outline"
        />
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
  timeline: {
    gap: 14,
  },
  eventCard: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    marginTop: 22,
  },
  eventContent: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  type: {
    backgroundColor: '#fff0f5',
    color: colors.primary,
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
  eventTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  eventDescription: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: colors.primary,
  },
  favoriteButtonText: {
    color: colors.primary,
    fontWeight: '900',
  },
  favoriteButtonTextActive: {
    color: colors.light,
  },
  backButton: {
    marginTop: 24,
  },
});