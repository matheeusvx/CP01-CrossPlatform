import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MenuCard from '../components/MenuCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
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
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.badge}>CP2</Text>
        <Text style={styles.title}>Challenge Hub FIAP</Text>
        <Text style={styles.subtitle}>
          Olá, {user.name}. Use o app para centralizar avisos, comunidade, empresa e calendário do Challenge.
        </Text>
      </View>

      <View style={styles.menu}>
        <MenuCard
          icon="📢"
          title="Avisos"
          description="Comunicados importantes e marcação de leitura."
          href="/avisos"
        />

        <MenuCard
          icon="🏢"
          title="Empresa"
          description="Contato com validação e histórico persistido."
          href="/empresa"
        />

        <MenuCard
          icon="💬"
          title="Comunidade"
          description="Comentários salvos localmente com AsyncStorage."
          href="/comunidade"
        />

        <MenuCard
          icon="📅"
          title="Calendário"
          description="Eventos, entregas e favoritos do Challenge."
          href="/calendario"
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Sair da conta" onPress={handleLogout} variant="outline" />
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
  hero: {
    backgroundColor: colors.dark,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    color: colors.light,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 12,
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
  footer: {
    marginTop: 24,
  },
});