import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Allergy {
  chatHistory: [];
  setChatHistory: (chatHistory: []) => void;

  reset: () => void;
}

export const useAllergy = create<Allergy>()(
  persist(
    (set) => ({
      chatHistory: [],

      setChatHistory: (chatHistory) => {
        set({ chatHistory });
      },

      reset: () => {
        set({ chatHistory: [] });
      },
    }),
    {
      name: "allergy-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        chatHistory: state.chatHistory,
      }),
    },
  ),
);
