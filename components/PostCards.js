import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PostCard({
  autor,
  titulo,
  conteudo,
  comentarios,
  ultimoComentario,
  selecionado,
  onSelect,
}) {
  return (
    <View style={[styles.card, selecionado && styles.cardSelected]}>
      <Text style={styles.author}>{autor}</Text>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.content}>{conteudo}</Text>

      <View style={styles.commentBox}>
        <Text style={styles.commentCount}>{comentarios} comentário(s)</Text>
        <Text style={styles.lastComment}>Último: {ultimoComentario}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onSelect}>
        <Text style={styles.buttonText}>
          {selecionado ? 'Post selecionado' : 'Comentar neste post'}
        </Text>
      </TouchableOpacity>
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
  cardSelected: {
    borderColor: '#ed145b',
    borderWidth: 2,
  },
  author: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b60f45',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 12,
  },
  commentBox: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  commentCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  lastComment: {
    fontSize: 13,
    color: '#666666',
  },
  button: {
    backgroundColor: '#111111',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});