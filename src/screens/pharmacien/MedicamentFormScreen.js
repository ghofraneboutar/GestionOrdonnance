import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useMedicamentStore } from "../../store/medicamentStore";

export const MedicamentFormScreen = ({ route, navigation }) => {
  const medicament = route.params?.medicament;
  const isEdit = !!medicament;

  const { addMedicament, updateMedicament } = useMedicamentStore();

  const [nom, setNom] = useState(medicament?.nom || "");
  const [dosage, setDosage] = useState(medicament?.dosage || "");
  const [forme, setForme] = useState(medicament?.forme || "");
  const [quantiteStock, setQuantiteStock] = useState(
    medicament?.quantiteStock?.toString() || ""
  );

  const handleSubmit = async () => {
    if (!nom || !dosage || !forme || !quantiteStock) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const data = {
      nom,
      dosage,
      forme,
      quantiteStock: parseInt(quantiteStock),
    };

    if (isEdit) {
      await updateMedicament(medicament.id, data);
      Alert.alert("Succès", "Médicament modifié avec succès");
    } else {
      await addMedicament({
        id: `m${Date.now()}`,
        ...data,
      });
      Alert.alert("Succès", "Médicament ajouté avec succès");
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Input
          label="Nom du médicament"
          value={nom}
          onChangeText={setNom}
          placeholder="Ex: Doliprane"
        />

        <Input
          label="Dosage"
          value={dosage}
          onChangeText={setDosage}
          placeholder="Ex: 500 mg"
        />

        <Input
          label="Forme"
          value={forme}
          onChangeText={setForme}
          placeholder="Ex: Comprimé, Gélule, Sirop"
        />

        <Input
          label="Quantité en stock"
          value={quantiteStock}
          onChangeText={setQuantiteStock}
          placeholder="Ex: 100"
          keyboardType="numeric"
        />

        <Button
          title={isEdit ? "Modifier le médicament" : "Ajouter le médicament"}
          onPress={handleSubmit}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
});
