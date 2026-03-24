import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from './components/Header';

export default function EmpresaScreen() {
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [historico, setHistorico] = useState([]);

  function enviarMensagem() {
    if (!assunto.trim() || !mensagem.trim()) {
      setFeedback({
        tipo: 'erro',
        texto: 'Preencha o assunto e a mensagem antes de enviar.',
      });
      return;
    }

    const novaMensagem = {
      id: Date.now(),
      assunto,
      mensagem,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    setHistorico([novaMensagem, ...historico]);
    setAssunto('');
    setMensagem('');
    setFeedback({
      tipo: 'sucesso',
      texto: 'Mensagem enviada com sucesso para a empresa.',
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Contato com a Empresa"
        subtitle="Envie dúvidas de forma simples para a empresa parceira do Challenge."
      />

      <View style={styles.formCard}>
        <Text style={styles.label}>Assunto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: dúvida sobre a sprint"
          value={assunto}
          onChangeText={setAssunto}
        />

        <Text style={styles.label}>Mensagem</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite sua dúvida..."
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={enviarMensagem}>
          <Text style={styles.buttonText}>Enviar dúvida</Text>
        </TouchableOpacity>
      </View>

      {feedback && (
        <View
          style={[
            styles.feedbackBox,
            feedback.tipo === 'erro' ? styles.feedbackError : styles.feedbackSuccess,
          ]}
        >
          <Text style={styles.feedbackText}>{feedback.texto}</Text>
        </View>
      )}

      <View style={styles.historyCard}>
        <Text style={styles.sectionTitle}>Histórico de mensagens</Text>

        {historico.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma mensagem enviada até agora.
          </Text>
        ) : (
          historico.map((item) => (
            <View key={item.id} style={styles.messageItem}>
              <Text style={styles.messageDate}>{item.data}</Text>
              <Text style={styles.messageTitle}>{item.assunto}</Text>
              <Text style={styles.messageBody}>{item.mensagem}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111111',
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ed145b',
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  feedbackBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  feedbackSuccess: {
    backgroundColor: '#e8f7ee',
    borderWidth: 1,
    borderColor: '#b7e4c7',
  },
  feedbackError: {
    backgroundColor: '#fdecec',
    borderWidth: 1,
    borderColor: '#f3b0b0',
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 14,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
  },
  messageItem: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  messageDate: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b60f45',
    marginBottom: 6,
  },
  messageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  messageBody: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
});