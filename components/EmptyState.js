import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function EmptyState({
  title = 'Nenhum item encontrado',
  description = 'Tente ajustar sua busca ou adicionar novos dados.',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔎</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});