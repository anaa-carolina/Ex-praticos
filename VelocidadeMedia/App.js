import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [distancia, setDistancia] = useState('');
  const [tempo, setTempo] = useState('');
  const [resultados, setResultados] = useState([]);

  const calcularVelocidade = () => {
    const d = parseFloat(distancia);
    const t = parseFloat(tempo);

    if (!isNaN(d) && !isNaN(t) && t !== 0) {
      const velocidade = d / t;
      const novoItem = {
        id: Date.now().toString(),
        distancia: d,
        tempo: t,
        velocidade: velocidade.toFixed(2),
      };
      setResultados([...resultados, novoItem]);
      setDistancia('');
      setTempo('');
    }
  };

  const limparLista = () => {
    setResultados([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Distância: {item.distancia} km</Text>
      <Text>Tempo: {item.tempo} h</Text>
      <Text>Velocidade Média: {item.velocidade} km/h</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Calculadora de Velocidade Média</Text>

        <TextInput
          style={styles.input}
          placeholder="Distância (km)"
          keyboardType="numeric"
          value={distancia}
          onChangeText={setDistancia}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo (h)"
          keyboardType="numeric"
          value={tempo}
          onChangeText={setTempo}
        />

        <View style={styles.buttonContainer}>
          <Button title="Calcular" onPress={calcularVelocidade} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Limpar lista" onPress={limparLista} color="red" />
        </View>

        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 5,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
});
