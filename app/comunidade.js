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

export default function ComunidadeScreen() {
  const { user, loadingAuth } = useAuth();
  const { comentarios, addComentario, loadingData } = useAppData();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.replace('/login');
    }
  }, [loadingAuth, user]);

  async function handleSubmit() {
    const validationError = validateRequired(message, 'O comentário não pode ficar vazio.');
    setError(validationError);

    if (validationError) {
      return;
    }

    try {
      setSubmitting(true);

      await addComentario({
        author: user.name,
        message,
      });

      setMessage('');
      setSuccessMessage('Comentário publicado e salvo localmente.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingAuth || loadingData || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando comunidade...</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Comunidade</Text>
      <Text style={styles.subtitle}>
        Compartilhe dúvidas, avisos e ideias com os integrantes do Challenge.
      </Text>

      <View style={styles.card}>
        <FeedbackMessage type="success" message={successMessage} />

        <InputField
          label="Novo comentário"
          value={message}
          onChangeText={value => {
            setMessage(value);
            setError('');
            setSuccessMessage('');
          }}
          placeholder="Digite sua mensagem para a comunidade"
          multiline
          error={error}
        />

        <PrimaryButton
          title="Publicar comentário"
          onPress={handleSubmit}
          loading={submitting}
        />
      </View>

      <Text style={styles.sectionTitle}>Comentários</Text>

      <View style={styles.list}>
        {comentarios.map(item => (
          <View style={styles.commentCard} key={item.id}>
            <View style={styles.commentHeader}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <Text style={styles.commentText}>{item.message}</Text>
          </View>
        ))}
      </View>

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
  list: {
    gap: 12,
  },
  commentCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  author: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 15,
    flex: 1,
  },
  date: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  commentText: {
    color: colors.mutedText,
    lineHeight: 21,
  },
  backButton: {
    marginTop: 24,
  },
});