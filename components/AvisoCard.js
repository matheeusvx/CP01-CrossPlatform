import { View, Text, StyleSheet } from 'react-native';

export default function AvisoCard({ titulo, descricao, data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{data}</Text>
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
  date: {
    alignSelf: 'flex-start',
    backgroundColor: '#fde7ef',
    color: '#b60f45',
    fontSize: 12,
    fontWeight: '700',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
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