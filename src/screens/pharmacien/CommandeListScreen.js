import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { CommandeItem } from "../../components/patient/CommandeItem";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useCommandeStore } from "../../store/commandeStore";
import { useAuthStore } from "../../store/authStore";

export const PharmacienCommandeListScreen = ({ navigation }) => {
  const { commandes, isLoading, loadCommandesByPharmacien } =
    useCommandeStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (currentUser) {
      loadCommandesByPharmacien(currentUser.id);
    }
  }, [currentUser]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commandes à traiter</Text>

      {commandes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune commande disponible</Text>
        </View>
      ) : (
        <FlatList
          data={commandes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommandeItem
              commande={item}
              onPress={() =>
                navigation.navigate("PharmacienCommandeDetail", {
                  commande: item,
                })
              }
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
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
