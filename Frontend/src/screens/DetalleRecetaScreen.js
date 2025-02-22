import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetalleRecetaScreen = ({ route, navigation }) => {
  const { receta } = route.params;

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await axios.delete(`http://localhost:5000/api/recipes/${receta._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert('Receta eliminada', 'La receta ha sido eliminada exitosamente.');
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting receta", error);
      Alert.alert('Error', 'No se pudo eliminar la receta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{receta.nombre}</Text>
      {receta.imagen && (
        <Image source={{ uri: `http://localhost:5000${receta.imagen}` }} style={styles.image} />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditarRecetaScreen', { recetaId: receta._id })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FF3737',
    paddingBottom: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FF3737',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#FFD859',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3737',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetalleRecetaScreen;