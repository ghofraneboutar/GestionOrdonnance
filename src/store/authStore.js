import { create } from "zustand";
import { authenticateUser, initializeUsers } from "../api/UserService"; // ✔️ majuscule U

export const useAuthStore = create((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  initialize: async () => {
    await initializeUsers();
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        set({ currentUser: user, isLoading: false });
        return true;
      } else {
        set({ error: "Email ou mot de passe incorrect", isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: "Erreur de connexion", isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({ currentUser: null });
  },
}));
