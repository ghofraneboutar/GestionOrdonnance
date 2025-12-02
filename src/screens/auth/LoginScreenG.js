import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../store/authStore";

export const LoginScreenG = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      // Navigation gérée par AppNavigator
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>⚕️</Text>
          </View>
          <Text style={styles.title}>Dweya Pharmacy</Text>
          <Text style={styles.subtitle}>Bienvenue</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="votre@email.com"
            keyboardType="email-address"
          />

          <Input
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={isLoading}
          />

          <View style={styles.demoAccounts}>
            <Text style={styles.demoTitle}>Comptes de démonstration:</Text>
            <Text style={styles.demoText}>
              Patient: patient@dweya.com / patient123
            </Text>
            <Text style={styles.demoText}>
              Pharmacien: pharma@dweya.com / pharma123
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14b8a6",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
  },
  error: {
    color: "#ef4444",
    marginBottom: 16,
    textAlign: "center",
  },
  demoAccounts: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f0fdfa",
    borderRadius: 12,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#14b8a6",
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
});
