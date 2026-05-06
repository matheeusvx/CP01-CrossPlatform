import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import FeedbackMessage from '../components/FeedbackMessage';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { validateRequired } from '../utils/validators';

export default function EmpresaScreen() {
  const { user, loadingAuth } = useAuth();
  const { mensagensEmpresa, addMensagemEmpresa, loadingData } = useAppData();

  const [form, setForm] = useState({
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/login');
    }
  }, [loadingAuth, user]);

  function updateField(field, value) {
    setForm(previous => ({
      ...previous,
      [field]: value,
    }));

    setErrors(previous => ({
      ...previous,
      [field]: '',
    }));

    setSuccessMessage('');
  }

  async function handleSubmit() {
    const validationErrors = {
      subject: validateRequired(form.subject, 'O assunto é obrigatório.'),
      message: validateRequired(form.message, 'A mensagem é obrigatória.'),
    };

    Object.keys(validationErrors).forEach(key => {
      if (!validationErrors[key]) {
        delete validationErrors[key];
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);

      await addMensagemEmpresa({
        subject: form.subject,
        message: form.message,
        userName: user.name,
      });

      setForm({
        subject: '',
        message: '',
      });

      setSuccessMessage('Mensagem enviada e salva localmente com sucesso.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingAuth || loadingData || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Empresa parceira</Text>
      <Text style={styles.subtitle}>
        Envie dúvidas, registre decisões e mantenha o histórico persistido no app.
      </Text>

      <View style={styles.card}>
        <FeedbackMessage type="success" message={successMessage} />

        <InputField
          label="Assunto"
          value={form.subject}
          onChangeText={value => updateField('subject', value)}
          placeholder="Ex: Dúvida sobre o briefing"
          error={errors.subject}
        />

        <InputField
          label="Mensagem"
          value={form.message}
          onChangeText={value => updateField('message', value)}
          placeholder="Descreva sua dúvida ou sugestão"
          multiline
          error={errors.message}
        />

        <PrimaryButton
          title="Enviar mensagem"
          onPress={handleSubmit}
          loading={submitting}
        />
      </View>

      <Text style={styles.sectionTitle}>Histórico salvo</Text>

      {mensagensEmpresa.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhuma mensagem enviada</Text>
          <Text style={styles.emptyText}>
            As mensagens enviadas aparecerão aqui mesmo depois de fechar o app.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {mensagensEmpresa.map(item => (
            <View style={styles.messageCard} key={item.id}>
              <Text style={styles.messageSubject}>{item.subject}</Text>
              <Text style={styles.messageBody}>{item.message}</Text>
              <Text style={styles.messageMeta}>
                Enviado por {item.userName} em{' '}
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          ))}
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
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 6,
  },
  emptyText: {
    color: colors.mutedText,
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  messageCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageSubject: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  messageBody: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 10,
  },
  messageMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  backButton: {
    marginTop: 24,
  },
});