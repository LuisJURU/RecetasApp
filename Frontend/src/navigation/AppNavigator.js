import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import RecetasScreen from "../screens/RecetasScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PerfilScreen from "../screens/PerfilScreen";
import AgregarRecetaScreen from "../screens/AgregarRecetaScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function PerfilDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Perfil">
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recetas" component={RecetasScreen} />
      <Tab.Screen name="Perfil" component={PerfilDrawer} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF3737", // Cambia este color al que desees
          },
          headerTintColor: "#fff", // Color del texto del encabezado
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recetas"
          component={RecetasScreen}
          options={{
            title: 'Mis Recetas',
            headerStyle: {
              backgroundColor: '#FF3737',
            },
            headerTintColor: '#FF3737',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AgregarReceta"
          component={AgregarRecetaScreen}
          options={{
            title: 'Agregar Receta',
            headerStyle: {
              backgroundColor: '#FF3737',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;