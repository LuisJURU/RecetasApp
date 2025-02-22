import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { IP, API_URL_LOCAL } from '@env';

const RecetasScreen = ({ navigation }) => {
  const [recetas, setRecetas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRecetas, setFilteredRecetas] = useState([]);

  const fetchRecetas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${IP}/api/recipes`, {
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
        <Image source={{ uri: `${IP}${item.imagen}` }} style={styles.recipeImage} />
      )}
      <Text style={styles.recipeTitle}>
        {item.nombre.length > 20 ? `${item.nombre.substring(0, 20)}...` : item.nombre}
      </Text>
      <Text style={styles.recipeDescription}>{item.descripcion}</Text>
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
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5733',
  },
  searchInput: {
    height: 40,
    borderColor: '#FF5733',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  recipeCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FF5733',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF5733',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default RecetasScreen;