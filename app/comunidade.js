import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import postsData from '../data/posts';

export default function ComunidadeScreen() {
  const [posts, setPosts] = useState(postsData);
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [comentario, setComentario] = useState('');
  const [feedback, setFeedback] = useState(null);

  function adicionarComentario() {
    if (!postSelecionado) {
      setFeedback({
        tipo: 'erro',
        texto: 'Selecione um post antes de comentar.',
      });
      return;
    }

    if (!comentario.trim()) {
      setFeedback({
        tipo: 'erro',
        texto: 'Digite um comentário antes de enviar.',
      });
      return;
    }

    const novosPosts = posts.map((post) => {
      if (post.id === postSelecionado) {
        return {
          ...post,
          comentarios: post.comentarios + 1,
          ultimoComentario: comentario,
        };
      }
      return post;
    });

    setPosts(novosPosts);
    setComentario('');
    setFeedback({
      tipo: 'sucesso',
      texto: 'Comentário adicionado com sucesso.',
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Comunidade"
        subtitle="Espaço simples para acompanhar posts e interações entre os grupos."
      />

      <View style={styles.commentPanel}>
        <Text style={styles.panelTitle}>Novo comentário</Text>
        <Text style={styles.panelSubtitle}>
          Selecione um post abaixo e envie um comentário rápido.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu comentário..."
          value={comentario}
          onChangeText={setComentario}
        />

        <TouchableOpacity style={styles.button} onPress={adicionarComentario}>
          <Text style={styles.buttonText}>Adicionar comentário</Text>
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

      {posts.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum post disponível</Text>
          <Text style={styles.emptyText}>
            A comunidade ainda não possui publicações.
          </Text>
        </View>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            autor={post.autor}
            titulo={post.titulo}
            conteudo={post.conteudo}
            comentarios={post.comentarios}
            ultimoComentario={post.ultimoComentario}
            selecionado={postSelecionado === post.id}
            onSelect={() => setPostSelecionado(post.id)}
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
  commentPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 6,
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ed145b',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
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