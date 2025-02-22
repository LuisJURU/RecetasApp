import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarRecetaScreen = ({ route }) => {
  const { recetaId } = route.params;
  const [receta, setReceta] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [comensales, setComensales] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [pasos, setPasos] = useState('');

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:5000/api/recipes/${recetaId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setReceta(response.data);
            setNombre(response.data.nombre);
            setDescripcion(response.data.descripcion);
            setTiempo(response.data.tiempo);
            setComensales(response.data.comensales);
            setIngredientes(response.data.ingredientes.join(', '));
            setPasos(response.data.pasos.join(', '));
          } else {
            Alert.alert('Error', 'No se pudo cargar la receta. Por favor, inténtalo de nuevo.');
          }
        }
      } catch (error) {
        console.error("Error fetching receta", error);
        Alert.alert('Error', `No se pudo cargar la receta. Por favor, inténtalo de nuevo. Error: ${error.message}`);
      }
    };

    fetchReceta();
  }, [recetaId]);

  if (!receta) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de la Receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiempo"
        value={tiempo}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Comensales"
        value={comensales}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes (separados por comas)"
        value={ingredientes}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Pasos (separados por comas)"
        value={pasos}
        editable={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default EditarRecetaScreen;