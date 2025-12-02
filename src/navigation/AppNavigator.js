import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { PharmacienNavigator } from "./PharmacienNavigator";
import { useAuthStore } from "../store/authStore";
import { useMedicamentStore } from "../store/medicamentStore";
import { useOrdonnanceStore } from "../store/ordonnanceStore";

export const AppNavigator = () => {
  const { currentUser, initialize: initAuth } = useAuthStore();
  const { initialize: initMeds } = useMedicamentStore();
  const { initialize: initOrds } = useOrdonnanceStore();

  useEffect(() => {
    const init = async () => {
      await initAuth();
      await initMeds();
      await initOrds();
    };
    init();
  }, []);

  const getNavigator = () => {
    if (!currentUser) {
      return <AuthNavigator />;
    }

    if (currentUser.role === "pharmacien") {
      return <PharmacienNavigator />;
    }

    return <AuthNavigator />;
  };

  return <NavigationContainer>{getNavigator()}</NavigationContainer>;
};
