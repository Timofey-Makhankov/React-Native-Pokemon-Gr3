import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://noseryoung.ddns.net:3030";

const jwtKey = "access_token";

export const defaultAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

/* SecureStorage Interceptor*/
