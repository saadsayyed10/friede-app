import { create } from "zustand";

interface ChatHistory {
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

export const useChatHistory = create<ChatHistory>((set) => ({
  chatHistory: [],

  setChatHistory: (chatHistory) => {
    set({ chatHistory });
  },

  reset: () => {
    set({ chatHistory: [] });
  },
}));
