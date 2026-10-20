import axios from "axios";
import { apiUrl } from "./apiUrl";

export const syncClerkUserAPI = async (
  userId: string,
  name: string,
  email: string,
  profilePictureUrl: string,
) => {
  return axios.post(`${apiUrl}/user/signup`, {
    userId,
    name,
    email,
    profilePictureUrl,
  });
};
