import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [pizzaOpen, setPizzaOpen] = useState(false);
  const [pizzaSabor, setPizzaSabor] = useState(null);
  const [pizzaSabores, setPizzaSabores] = useState([
    { label: 'Calabresa - R$30', value: 'calabresa', price: 30 },
    { label: 'Frango - R$32', value: 'frango', price: 32 },
    { label: 'Quatro Queijos - R$35', value: 'queijos', price: 35 },
  ]);

  const [bebidas, setBebidas] = useState({
    coca: false,
    guarana: false,
    agua: false,
  });

  const [borda, setBorda] = useState('nao');
  const [total, setTotal] = useState(null);

  const calcularTotal = () => {
    const precoPizza = pizzaSabores.find((p) => p.value === pizzaSabor)?.price || 0;
    let precoBebidas = 0;

    if (bebidas.coca) precoBebidas += 8;
    if (bebidas.guarana) precoBebidas += 7;
    if (bebidas.agua) precoBebidas += 5;

    const precoBorda = borda === 'sim' ? 5 : 0;

    setTotal(precoPizza + precoBebidas + precoBorda);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>🍕 Pizzaria React</Text>

          <Text style={styles.label}>Escolha o sabor da pizza:</Text>
          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={pizzaOpen}
              value={pizzaSabor}
              items={pizzaSabores}
              setOpen={setPizzaOpen}
              setValue={setPizzaSabor}
              setItems={setPizzaSabores}
              placeholder="Selecione o sabor"
              style={styles.dropdown}
            />
          </View>

          <Text style={styles.label}>Escolha suas bebidas:</Text>
          <View style={styles.checkboxRow}>
            <Checkbox
              value={bebidas.coca}
              onValueChange={(val) => setBebidas({ ...bebidas, coca: val })}
            />
            <Text style={styles.checkboxLabel}>Coca-Cola (R$8)</Text>
          </View>
          <View style={styles.checkboxRow}>
            <Checkbox
              value={bebidas.guarana}
              onValueChange={(val) => setBebidas({ ...bebidas, guarana: val })}
            />
            <Text style={styles.checkboxLabel}>Guaraná (R$7)</Text>
          </View>
          <View style={styles.checkboxRow}>
            <Checkbox
              value={bebidas.agua}
              onValueChange={(val) => setBebidas({ ...bebidas, agua: val })}
            />
            <Text style={styles.checkboxLabel}>Água (R$5)</Text>
          </View>

          <Text style={styles.label}>Deseja borda recheada?</Text>
          <RadioButton.Group
            onValueChange={(value) => setBorda(value)}
            value={borda}
          >
            <View style={styles.radioRow}>
              <RadioButton value="sim" />
              <Text style={styles.radioLabel}>Sim (+R$5)</Text>
            </View>
            <View style={styles.radioRow}>
              <RadioButton value="nao" />
              <Text style={styles.radioLabel}>Não</Text>
            </View>
          </RadioButton.Group>

          <Button title="Calcular Total" onPress={calcularTotal} />

          {total !== null && (
            <Text style={styles.total}>💰 Total a pagar: R${total.toFixed(2)}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  dropdown: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 15,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
});
