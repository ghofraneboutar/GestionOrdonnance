import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { CommandeStatusBadge } from "../../components/pharmacien/CommandeStatusBadge";
import { useCommandeStore } from "../../store/commandeStore";

export const PharmacienCommandeDetailScreen = ({ route, navigation }) => {
  const { commande } = route.params;
  const { updateCommandeStatus } = useCommandeStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    await updateCommandeStatus(commande.id, newStatus);
    setIsUpdating(false);

    Alert.alert("Succès", "Le statut de la commande a été mis à jour", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const getNextStatus = () => {
    switch (commande.status) {
      case "en_attente":
        return { status: "en_preparation", label: "Commencer la préparation" };
      case "en_preparation":
        return { status: "prete", label: "Marquer comme prête" };
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <ScrollView style={styles.container}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.title}>Commande #{commande.id}</Text>
          <CommandeStatusBadge status={commande.status} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations patient</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.value}>{commande.patientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lieu de livraison:</Text>
            <Text style={styles.value}>{commande.lieuLivraison}</Text>
          </View>
        </View>

        {commande.remarques && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Remarques</Text>
            <Text style={styles.remarques}>{commande.remarques}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date de création</Text>
          <Text style={styles.value}>{commande.dateCreation}</Text>
        </View>
      </Card>

      {nextStatus && (
        <Button
          title={nextStatus.label}
          onPress={() => handleStatusUpdate(nextStatus.status)}
          loading={isUpdating}
        />
      )}

      {commande.status === "prete" && (
        <View style={styles.completeMessage}>
          <Text style={styles.completeText}>✅ Cette commande est prête</Text>
        </View>
      )}
    </ScrollView>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "600",
  },
  remarques: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  completeMessage: {
    backgroundColor: "#d1fae5",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  completeText: {
    fontSize: 16,
    color: "#065f46",
    fontWeight: "600",
    textAlign: "center",
  },
});
