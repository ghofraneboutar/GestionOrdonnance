import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PharmacienCommandeListScreen } from "../screens/pharmacien/CommandeListScreen";
import { PharmacienCommandeDetailScreen } from "../screens/pharmacien/CommandeDetailScreen";
import { MedicamentListScreen } from "../screens/pharmacien/MedicamentListScreen";
import { MedicamentFormScreen } from "../screens/pharmacien/MedicamentFormScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CommandeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PharmacienCommandeList"
      component={PharmacienCommandeListScreen}
      options={{ title: "Commandes" }}
    />
    <Stack.Screen
      name="PharmacienCommandeDetail"
      component={PharmacienCommandeDetailScreen}
      options={{ title: "Détail Commande" }}
    />
  </Stack.Navigator>
);

const MedicamentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MedicamentList"
      component={MedicamentListScreen}
      options={{ title: "Médicaments" }}
    />
    <Stack.Screen
      name="MedicamentForm"
      component={MedicamentFormScreen}
      options={({ route }) => ({
        title: route.params?.medicament
          ? "Modifier Médicament"
          : "Nouveau Médicament",
      })}
    />
  </Stack.Navigator>
);

export const PharmacienNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#14b8a6",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      <Tab.Screen
        name="CommandesTab"
        component={CommandeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Commandes",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="MedicamentsTab"
        component={MedicamentStack}
        options={{
          headerShown: false,
          tabBarLabel: "Médicaments",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💊</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
