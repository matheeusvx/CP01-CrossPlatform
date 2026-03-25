import { View, Text, StyleSheet } from 'react-native';

export default function EventoCard({ data, titulo, descricao, tipo }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.date}>{data}</Text>
        <Text style={styles.type}>{tipo}</Text>
      </View>

      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b60f45',
  },
  type: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444444',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
});