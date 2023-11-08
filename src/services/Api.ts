import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://noseryoung.ddns.net:3030";

const jwtKey = "access_token";

export const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

defaultAxiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync(jwtKey);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
