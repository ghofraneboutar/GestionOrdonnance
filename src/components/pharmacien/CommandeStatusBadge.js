import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CommandeStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "en_attente":
        return { bg: "#fef3c7", text: "#92400e", label: "En attente" };
      case "en_preparation":
        return { bg: "#dbeafe", text: "#1e40af", label: "En préparation" };
      case "prete":
        return { bg: "#d1fae5", text: "#065f46", label: "Prête" };
      default:
        return { bg: "#f3f4f6", text: "#1f2937", label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
