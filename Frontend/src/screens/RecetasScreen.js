import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecetasScreen = ({ navigation }) => {
  const [recetas, setRecetas] = useState([]);

  // useEffect(() => {
  //   const fetchRecetas = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       if (token) {
  //         const response = await axios.get('http://192.168.1.108:5000/api/recetas', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setRecetas(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recetas", error);
  //     }
  //   };
  //   fetchRecetas();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Recetas</Text>
      <FlatList
        data={recetas}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text>{item.nombre}</Text>
          </View>
        )}
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
  recipeCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

export default RecetasScreen;