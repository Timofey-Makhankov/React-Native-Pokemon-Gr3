import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://noseryoung.ddns.net";

const jwtKey = "access_token";

export const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

defaultAxiosInstance.interceptors.request.use(async (request) => {
  console.log("trying to get token");
  const accessToken = await SecureStore.getItemAsync(jwtKey);
  console.log(accessToken);

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});
