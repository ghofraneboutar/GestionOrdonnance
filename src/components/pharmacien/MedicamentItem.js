import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "../common/Card";

export const MedicamentItem = ({ medicament, onEdit, onDelete }) => {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.nom}>{medicament.nom}</Text>
          <Text style={styles.details}>
            {medicament.dosage} - {medicament.forme}
          </Text>
          <Text style={styles.stock}>Stock: {medicament.quantiteStock}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  nom: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  stock: {
    fontSize: 14,
    color: "#14b8a6",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    padding: 8,
  },
  editText: {
    fontSize: 20,
  },
  deleteText: {
    fontSize: 20,
  },
});
