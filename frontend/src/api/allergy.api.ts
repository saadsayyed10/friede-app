import axios from "axios";
import { aiApiUrl, apiUrl } from "./apiUrl";
import type { AllergyItem } from "@/hooks/useAllergy";

export const allergyInformationExtractionAIAgentAPI = async (
  question: string,
  patientId: string,
  chatHistory: any,
) => {
  return axios.post(`${aiApiUrl}/ai/allergy`, {
    question,
    patientId,
    chatHistory,
  });
};

export const updateAllergyInformationAPI = async (
  allergies: AllergyItem[],
  token: string,
) => {
  return axios.put(
    `${apiUrl}/allergy/update`,
    { allergies },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
