import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Allergy {
  allergies:
    | [
        {
          allergy: string;
          cause: string;
          risk: string;
        },
      ]
    | [];

  setAllergies: (
    allergies: [
      {
        allergy: string;
        cause: string;
        risk: string;
      },
    ],

    reset: () => void,
  ) => void;
}

export const useAllergy = create<Allergy>()(
  persist(
    (set) => ({
      allergies: [],

      setAllergies: (allergies) => {
        set({ allergies });
      },

      reset: () => {
        set({ allergies: [] });
      },
    }),
    {
      name: "allergies-storage",
      storage: createJSONStorage(() => localStorage),

      // Persist only the data, not the setter functions.
      partialize: (state) => ({
        allergies: state.allergies,
      }),
    },
  ),
);
