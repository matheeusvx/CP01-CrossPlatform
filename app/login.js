import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FeedbackMessage from '../components/FeedbackMessage';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validators';

export default function LoginScreen() {
  const { login, loadingAuth } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm(previous => ({
      ...previous,
      [field]: value,
    }));

    setErrors(previous => ({
      ...previous,
      [field]: '',
    }));

    setGeneralError('');
  }

  async function handleLogin() {
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      await login(form);
      router.replace('/');
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando sessão...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer contentStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Challenge Hub FIAP</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta para acompanhar avisos, calendário e comunidade.
          </Text>

          <FeedbackMessage type="error" message={generalError} />

          <InputField
            label="E-mail"
            value={form.email}
            onChangeText={value => updateField('email', value)}
            placeholder="usuario@dominio.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <InputField
            label="Senha"
            value={form.password}
            onChangeText={value => updateField('password', value)}
            placeholder="Digite sua senha"
            secureTextEntry
            error={errors.password}
          />

          <PrimaryButton
            title="Entrar"
            onPress={handleLogin}
            loading={submitting}
          />

          <Pressable onPress={() => router.push('/cadastro')}>
            <Text style={styles.link}>Ainda não tem conta? Cadastre-se</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    justifyContent: 'center',
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
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
    marginBottom: 22,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 18,
  },
});