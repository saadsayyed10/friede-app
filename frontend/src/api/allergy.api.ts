import axios from "axios";
import { aiApiUrl } from "./apiUrl";

export const allergyInformationExtractionAIAgentAPI = async (
  question: string,
  patientId: string,
  chatHistory: [],
) => {
  return axios.post(`${aiApiUrl}/ai/allergy`, {
    question,
    patientId,
    chatHistory,
  });
};
