import { getItem, saveItem } from "./asyncStorage";

const ORDONNANCE_KEY = "ordonnances";

// Récupérer les ordonnances
export const getOrdonnances = async () => {
  return (await getItem(ORDONNANCE_KEY)) || [];
};

// Ajouter une ordonnance
export const addOrdonnance = async (ordonnance) => {
  const ords = await getOrdonnances();
  const newList = [...ords, ordonnance];
  await saveItem(ORDONNANCE_KEY, newList);
  return newList;
};

// Mettre à jour une ordonnance
export const updateOrdonnance = async (id, updated) => {
  const ords = await getOrdonnances();
  const newList = ords.map((o) =>
    o.id === id ? { ...o, ...updated } : o
  );
  await saveItem(ORDONNANCE_KEY, newList);
  return newList;
};
