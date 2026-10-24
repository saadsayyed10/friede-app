import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Registration {
  userId: string | null;
  setUserId: (userId: string) => void;

  name: string | null;
  setName: (name: string) => void;

  email: string | null;
  setEmail: (email: string) => void;

  profilePictureUrl: string | null;
  setProfilePictureUrl: (profilePictureUrl: string) => void;

  reset: () => void;
}

export const useSignUp = create<Registration>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      email: null,
      profilePictureUrl: null,

      setUserId: (userId) => set({ userId }),

      setName: (name) => set({ name }),

      setEmail: (email) => set({ email }),

      setProfilePictureUrl: (profilePictureUrl) => set({ profilePictureUrl }),

      reset: () =>
        set({
          userId: null,
          name: null,
          email: null,
          profilePictureUrl: null,
        }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => localStorage),

      // Persist only the data, not the setter functions.
      partialize: (state) => ({
        userId: state.userId,
        name: state.name,
        email: state.email,
        profilePictureUrl: state.profilePictureUrl,
      }),
    },
  ),
);
