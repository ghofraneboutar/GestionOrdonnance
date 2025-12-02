import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../../store/authStore";

export default function AuthLoadingScreen({ navigation }) {
  const { initialize, currentUser, isLoading } = useAuthStore();

  // Initialise les utilisateurs au démarrage
  useEffect(() => {
    initialize();
  }, []);

  // Quand l’auth change → Navigation automatique
  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        navigation.replace("Login");
      } else {
        switch (currentUser.role) {
          case "patient":
            navigation.replace("PatientHome");
            break;
          case "pharmacien":
            navigation.replace("PharmacienHome");
            break;
          case "medecin":
            navigation.replace("MedecinHome");
            break;
          default:
            navigation.replace("Login");
        }
      }
    }
  }, [isLoading, currentUser]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
