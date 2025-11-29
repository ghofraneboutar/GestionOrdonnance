import { getItem, saveItem } from "./asyncStorage";

const PATIENT_KEY = "patients";

// Récupérer tous les patients
export const getPatients = async () => {
  return (await getItem(PATIENT_KEY)) || [];
};

// Ajouter un patient
export const addPatient = async (patient) => {
  const patients = await getPatients();
  const newList = [...patients, patient];
  await saveItem(PATIENT_KEY, newList);
  return newList;
};

// Mettre à jour un patient
export const updatePatient = async (id, updated) => {
  const patients = await getPatients();
  const newList = patients.map((p) =>
    p.id === id ? { ...p, ...updated } : p
  );
  await saveItem(PATIENT_KEY, newList);
  return newList;
};

// Supprimer un patient
export const deletePatient = async (id) => {
  const patients = await getPatients();
  const newList = patients.filter((p) => p.id !== id);
  await saveItem(PATIENT_KEY, newList);
  return newList;
};
