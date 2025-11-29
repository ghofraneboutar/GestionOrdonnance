import { getItem, saveItem } from "./asyncStorage";

const MEDICAMENT_KEY = "medicaments";

// Récupérer les médicaments
export const getMedicaments = async () => {
  return (await getItem(MEDICAMENT_KEY)) || [];
};

// Ajouter un médicament
export const addMedicament = async (medicament) => {
  const meds = await getMedicaments();
  const newList = [...meds, medicament];
  await saveItem(MEDICAMENT_KEY, newList);
  return newList;
};

// Mettre à jour un médicament
export const updateMedicament = async (id, updated) => {
  const meds = await getMedicaments();
  const newList = meds.map((m) =>
    m.id === id ? { ...m, ...updated } : m
  );
  await saveItem(MEDICAMENT_KEY, newList);
  return newList;
};

// Supprimer un médicament
export const deleteMedicament = async (id) => {
  const meds = await getMedicaments();
  const newList = meds.filter((m) => m.id !== id);
  await saveItem(MEDICAMENT_KEY, newList);
  return newList;
};
