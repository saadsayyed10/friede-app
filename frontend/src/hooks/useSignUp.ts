import { create } from "zustand";

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

export const useSignUp = create<Registration>((set) => ({
  userId: null,
  name: null,
  email: null,
  profilePictureUrl: null,

  setUserId: (userId) => {
    set({ userId });
  },

  setName: (name) => {
    set({ name });
  },

  setEmail: (email) => {
    set({ email });
  },

  setProfilePictureUrl: (profilePictureUrl) => {
    set({ profilePictureUrl });
  },

  reset: () => {
    set({ userId: null, name: null, email: null, profilePictureUrl: null });
  },
}));
