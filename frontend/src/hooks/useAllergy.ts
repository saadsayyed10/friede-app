import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AllergyItem {
  allergy: string;
  cause: string;
  risk: string;
}

interface AllergyState {
  allergies: AllergyItem[];
  setAllergies: (allergies: AllergyItem[]) => void;
  reset: () => void;
}

export const useAllergy = create<AllergyState>()(
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
