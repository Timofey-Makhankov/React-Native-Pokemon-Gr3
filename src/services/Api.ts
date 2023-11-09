import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

// Default URL of the application
const BASE_URL = "https://noseryoung.ddns.net";

const jwtKey = "access_token";

/**
 * Default configuration of the axios instance with given BaseURL
 */
export const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

/**
 * Intercepter for including JWT token
 */
defaultAxiosInstance.interceptors.request.use(async (request) => {
  const accessToken = await SecureStore.getItemAsync(jwtKey);

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});
