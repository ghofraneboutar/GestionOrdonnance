import React, { useEffect } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { clearStorage, saveItem } from "./src/api/asyncStorage.js";
import { initializeUsers } from "./src/api/UserService.js";

export default function App() {
  useEffect(() => {
    const setupApp = async () => {
      // Supprimer toutes les anciennes données
      await clearStorage();
      console.log("Storage nettoyé");

      // 2 Initialiser les utilisateurs par défaut
      const defaultUsers = await initializeUsers();
      console.log("Utilisateurs initialisés :", defaultUsers);
    };

    setupApp();
  }, []);

  return <AppNavigator />;
}
