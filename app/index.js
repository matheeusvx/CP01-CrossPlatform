import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, loadingAuth, logout } = useAuth();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/login');
    }
  }, [loadingAuth, user]);

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  if (loadingAuth || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Verificando sessão...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Challenge Hub FIAP</Text>
        <Text style={styles.subtitle}>
          Olá, {user.name}. Acompanhe avisos, comunidade, empresa e calendário em um só lugar.
        </Text>
      </View>

      <View style={styles.menu}>
        <Pressable style={styles.card} onPress={() => router.push('/avisos')}>
          <Text style={styles.cardTitle}>Avisos</Text>
          <Text style={styles.cardText}>Veja comunicados importantes do Challenge.</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/empresa')}>
          <Text style={styles.cardTitle}>Empresa</Text>
          <Text style={styles.cardText}>Envie dúvidas e mensagens relacionadas ao projeto.</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/comunidade')}>
          <Text style={styles.cardTitle}>Comunidade</Text>
          <Text style={styles.cardText}>Participe da troca de ideias entre alunos.</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => router.push('/calendario')}>
          <Text style={styles.cardTitle}>Calendário</Text>
          <Text style={styles.cardText}>Acompanhe entregas, checkpoints e apresentações.</Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
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
  hero: {
    backgroundColor: colors.dark,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  title: {
    color: colors.light,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#e5e5e5',
    fontSize: 15,
    lineHeight: 22,
  },
  menu: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  cardText: {
    color: colors.mutedText,
    lineHeight: 21,
  },
  logoutButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 15,
  },
});