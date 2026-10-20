import axios from "axios";
import { apiUrl } from "./apiUrl";

export const syncClerkUserAPI = async (
  userId: string,
  name: string,
  email: string,
  profilePictureUrl: string,
  token: string,
) => {
  return axios.post(
    `${apiUrl}/user/signup`,
    {
      userId,
      name,
      email,
      profilePictureUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const verifyUserAPI = async (token: string) => {
  return axios.get(`${apiUrl}/user/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
