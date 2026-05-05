import { router } from 'expo-router';
import { useState } from 'react';
import {
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
import { validateRegisterForm } from '../utils/validators';

export default function CadastroScreen() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  async function handleRegister() {
    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      router.replace('/');
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer contentStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para salvar sua sessão no aplicativo.
          </Text>

          <FeedbackMessage type="error" message={generalError} />

          <InputField
            label="Nome completo"
            value={form.name}
            onChangeText={value => updateField('name', value)}
            placeholder="Seu nome completo"
            error={errors.name}
          />

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
            placeholder="Mínimo de 6 caracteres"
            secureTextEntry
            error={errors.password}
          />

          <InputField
            label="Confirmar senha"
            value={form.confirmPassword}
            onChangeText={value => updateField('confirmPassword', value)}
            placeholder="Repita sua senha"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <PrimaryButton
            title="Cadastrar"
            onPress={handleRegister}
            loading={submitting}
          />

          <Pressable onPress={() => router.push('/login')}>
            <Text style={styles.link}>Já tenho conta</Text>
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