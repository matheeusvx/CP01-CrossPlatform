import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import AvisoCard from '../components/AvisoCard';
import avisosData from '../data/avisos';

export default function AvisosScreen() {
  const [loading, setLoading] = useState(true);
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAvisos(avisosData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function recarregarAvisos() {
    setLoading(true);

    setTimeout(() => {
      setAvisos(avisosData);
      setLoading(false);
    }, 800);
  }

  function simularTelaVazia() {
    setAvisos([]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Portal de Avisos"
        subtitle="Acompanhe recados e atualizações importantes do Challenge."
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={recarregarAvisos}>
          <Text style={styles.primaryButtonText}>Recarregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={simularTelaVazia}>
          <Text style={styles.secondaryButtonText}>Simular vazio</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackTitle}>Carregando avisos...</Text>
          <Text style={styles.feedbackText}>
            Aguarde enquanto buscamos as informações.
          </Text>
        </View>
      ) : avisos.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum aviso encontrado</Text>
          <Text style={styles.emptyText}>
            No momento, não há comunicados cadastrados.
          </Text>
        </View>
      ) : (
        avisos.map((aviso) => (
          <AvisoCard
            key={aviso.id}
            titulo={aviso.titulo}
            descricao={aviso.descricao}
            data={aviso.data}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#ed145b',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ed145b',
  },
  secondaryButtonText: {
    color: '#ed145b',
    fontWeight: '700',
  },
  feedbackBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#ed145b',
  },
  feedbackTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  feedbackText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  emptyBox: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});