import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MedicamentItem } from "../../components/pharmacien/MedicamentItem";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useMedicamentStore } from "../../store/medicamentStore";

export const MedicamentListScreen = ({ navigation }) => {
  const { medicaments, isLoading, loadMedicaments, deleteMedicament } =
    useMedicamentStore();

  useEffect(() => {
    loadMedicaments();
  }, []);

  const handleDelete = async (id) => {
    await deleteMedicament(id);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Médicaments</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("MedicamentForm")}
        >
          <Text style={styles.addButtonText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      {medicaments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun médicament disponible</Text>
        </View>
      ) : (
        <FlatList
          data={medicaments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MedicamentItem
              medicament={item}
              onEdit={() =>
                navigation.navigate("MedicamentForm", { medicament: item })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
  },
  addButton: {
    backgroundColor: "#14b8a6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
