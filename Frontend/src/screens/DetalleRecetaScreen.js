import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetalleRecetaScreen = ({ route }) => {
  const { receta } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{receta.nombre}</Text>
      {receta.imagen && (
        <Image source={{ uri: `http://http://localhost:5000${receta.imagen}` }} style={styles.image} />
      )}
      <Text style={styles.subtitle}>Descripción</Text>
      <Text style={styles.text}>{receta.descripcion}</Text>
      <Text style={styles.subtitle}>Tiempo de elaboración</Text>
      <Text style={styles.text}>{receta.tiempo} minutos</Text>
      <Text style={styles.subtitle}>Comensales</Text>
      <Text style={styles.text}>{receta.comensales}</Text>
      <Text style={styles.subtitle}>Ingredientes</Text>
      {receta.ingredientes && receta.ingredientes.map((ingrediente, index) => (
        <Text key={index} style={styles.text}>- {ingrediente}</Text>
      ))}
      <Text style={styles.subtitle}>Pasos</Text>
      {receta.pasos && receta.pasos.map((paso, index) => (
        <Text key={index} style={styles.text}>{index + 1}. {paso}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
});

export default DetalleRecetaScreen;