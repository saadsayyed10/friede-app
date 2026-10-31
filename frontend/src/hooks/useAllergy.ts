import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Allergy {
  chatHistory:
    | [
        {
          role: "human" | "ai";
          content: string;
        },
      ]
    | [];
  setChatHistory: (
    chatHistory: [
      {
        role: "human" | "ai";
        content: string;
      },
    ],
  ) => void;

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
