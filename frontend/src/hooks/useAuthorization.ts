import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreResult {
  result: boolean | null;
  setResult: (result: boolean) => void;

  clearResult: () => void;
}

export const useAuthorization = create<StoreResult>()(
  persist(
    (set) => ({
      result: null,

      setResult: (result) => {
        set({ result });
      },

      clearResult: () => {
        set({ result: null });
      },
    }),
    {
      name: "reset-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        result: state.result,
      }),
    },
  ),
);
