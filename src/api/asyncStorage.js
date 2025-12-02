import AsyncStorage from "@react-native-async-storage/async-storage";

// Sauvegarder n'importe quel type de donnée
export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Erreur sauvegarde", error);
  }
};

// Lire un item JSON ou une ancienne valeur Boolean
export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (err) {
      // Si l'ancien stockage était un Boolean stocké en String
      if (data === "true") return true;
      if (data === "false") return false;
      return data; // retourne la string brute
    }
  } catch (error) {
    console.error("Erreur lecture", error);
    return null;
  }
};

// Lire un Boolean en toute sécurité
export const getBooleanItem = async (key, defaultValue = false) => {
  const value = await getItem(key);
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return defaultValue;
};

// Supprimer un item
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Erreur suppression", error);
  }
};

// Supprimer toutes les données existantes dans AsyncStorage
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Toutes les données AsyncStorage ont été supprimées.");
  } catch (error) {
    console.error("Erreur lors de la suppression de toutes les données", error);
  }
};
