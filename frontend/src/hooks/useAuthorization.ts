import { create } from "zustand";

interface StoreResult {
  result: boolean | null;
  setResult: (result: boolean) => void;

  clearResult: () => void;
}

export const useAuthorization = create<StoreResult>((set) => ({
  result: null,

  setResult: (result) => {
    set({ result });
  },

  clearResult: () => {
    set({ result: null });
  },
}));
