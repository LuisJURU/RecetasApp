import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const RecetasScreen = ({ navigation }) => {
  const [recetas, setRecetas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRecetas, setFilteredRecetas] = useState([]);

  const fetchRecetas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:5000/api/recipes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecetas(response.data);
        setFilteredRecetas(response.data);
      }
    } catch (error) {
      console.error("Error fetching recetas", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecetas();
    }, [])
  );

  useEffect(() => {
    setFilteredRecetas(
      recetas.filter(receta =>
        receta.nombre.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, recetas]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate('DetalleRecetaScreen', { receta: item })}>
      {item.imagen && (
        <Image source={{ uri: `http://localhost:5000${item.imagen}` }} style={styles.recipeImage} />
      )}
      <Text style={styles.recipeTitle}>
        {item.nombre.length > 20 ? `${item.nombre.substring(0, 30)}...` : item.nombre}
      </Text>
      <Text>{item.descripcion}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditarReceta', { recetaId: item._id })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Recetas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar receta..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredRecetas}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <Pressable style={styles.fab} onPress={() => navigation.navigate('AgregarReceta')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
};

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
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recipeCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    maxHeight: 25,
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#FFD859',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFD859',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RecetasScreen;