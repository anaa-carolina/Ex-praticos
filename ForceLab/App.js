import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SectionList,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [massa, setMassa] = useState('');
  const [aceleracao, setAceleracao] = useState('');
  const [dados, setDados] = useState({
    leves: [],
    medios: [],
    pesados: [],
  });

  const calcularForca = () => {
    const m = parseFloat(massa);
    const a = parseFloat(aceleracao);

    if (!isNaN(m) && !isNaN(a)) {
      const forca = m * a;
      const novoItem = {
        id: Date.now().toString(),
        massa: m,
        aceleracao: a,
        forca: forca.toFixed(2),
      };

      if (m < 10) {
        setDados((prev) => ({
          ...prev,
          leves: [...prev.leves, novoItem],
        }));
      } else if (m <= 50) {
        setDados((prev) => ({
          ...prev,
          medios: [...prev.medios, novoItem],
        }));
      } else {
        setDados((prev) => ({
          ...prev,
          pesados: [...prev.pesados, novoItem],
        }));
      }

      setMassa('');
      setAceleracao('');
    }
  };

  const limparDados = () => {
    setDados({ leves: [], medios: [], pesados: [] });
  };

  const sections = [
    { title: 'Objetos Leves (< 10 kg)', data: dados.leves },
    { title: 'Objetos Médios (10–50 kg)', data: dados.medios },
    { title: 'Objetos Pesados (> 50 kg)', data: dados.pesados },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Massa: {item.massa} kg</Text>
      <Text>Aceleração: {item.aceleracao} m/s²</Text>
      <Text>Força: {item.forca} N</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Calculadora de Força (F = m × a)</Text>

        <TextInput
          style={styles.input}
          placeholder="Massa (kg)"
          keyboardType="numeric"
          value={massa}
          onChangeText={setMassa}
        />
        <TextInput
          style={styles.input}
          placeholder="Aceleração (m/s²)"
          keyboardType="numeric"
          value={aceleracao}
          onChangeText={setAceleracao}
        />

        <View style={styles.buttonContainer}>
          <Button title="Calcular" onPress={calcularForca} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Limpar dados" onPress={limparDados} color="red" />
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
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
    backgroundColor: '#eef2f5',
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#d0e0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
