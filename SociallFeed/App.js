import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const postsIniciais = [
  {
    id: '1',
    usuario: 'Ana',
    conteudo: 'Hoje o dia foi incrível! 🌞',
    curtidas: 0,
    seguindo: false,
    comentarios: [],
  },
  {
    id: '2',
    usuario: 'Bruno',
    conteudo: 'Alguém aí já viu o novo filme da Marvel?',
    curtidas: 0,
    seguindo: false,
    comentarios: [],
  },
  {
    id: '3',
    usuario: 'Carla',
    conteudo: 'Comecei a aprender React Native! 🚀',
    curtidas: 0,
    seguindo: false,
    comentarios: [],
  },
];

export default function App() {
  const [posts, setPosts] = useState(postsIniciais);
  const [comentario, setComentario] = useState('');

  const curtirPost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, curtidas: post.curtidas + 1 } : post
      )
    );
  };

  const seguirUsuario = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, seguindo: !post.seguindo } : post
      )
    );
  };

  const comentarPost = (id) => {
    if (comentario.trim() === '') return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
            ...post,
            comentarios: [...post.comentarios, comentario],
          }
          : post
      )
    );
    setComentario('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.usuario}>{item.usuario}</Text>
      <Text style={styles.conteudo}>{item.conteudo}</Text>
      <Text style={styles.curtidas}>Curtidas: {item.curtidas}</Text>

      <View style={styles.botoes}>
        <Button title="Curtir" onPress={() => curtirPost(item.id)} />
        <Button
          title={item.seguindo ? 'Seguindo' : 'Seguir'}
          onPress={() => seguirUsuario(item.id)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Comentar..."
        value={comentario}
        onChangeText={setComentario}
      />
      <Button title="Enviar comentário" onPress={() => comentarPost(item.id)} />

      {item.comentarios.length > 0 && (
        <View style={styles.comentarios}>
          <Text style={styles.comentariosTitulo}>Comentários:</Text>
          {item.comentarios.map((c, index) => (
            <Text key={index} style={styles.comentario}>
              • {c}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>SocialFeed</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  conteudo: {
    marginVertical: 8,
    fontSize: 15,
  },
  curtidas: {
    fontSize: 14,
    marginBottom: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  comentarios: {
    marginTop: 10,
  },
  comentariosTitulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comentario: {
    fontSize: 13,
    marginLeft: 10,
  },
});