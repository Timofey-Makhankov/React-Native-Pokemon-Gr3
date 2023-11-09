import axios, { AxiosInstance, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "./Api";
import * as SecureStore from "expo-secure-store";

type userResponse = {
  accessToken: string,
  user: {
    id?: number,
    email: string,
    firstName?: string
    lastName?: string,
    age: number
  }
}

/**
 * The Authorization for authorizing users
 * @param api of an axios instance. gives defaultAxiosInstance when no api is provided
 * @returns a list of function used by the service
 */
const AuthorizationService = (api: AxiosInstance = defaultAxiosInstance) => ({
  /**
   * Check, whether the saved token exists
   * @returns
   */
  checkActiveToken: async () => {
    const accessToken = await SecureStore.getItemAsync("acces_token");
    if (accessToken) {
      return true;
    }
    return false;
  },

  /**
   * log a user and save the JWT token to device
   * @param email string
   * @param password string
   * @returns the jwt token provided from the response
   */
  logInUser: async (email: string, password: string) => {
    const input = {
      email: email,
      password: password,
    };
    const data: AxiosResponse<userResponse> = await api.post("/login", input);
    await SecureStore.setItemAsync("access_token", data.data.accessToken);
    await SecureStore.setItemAsync("user_detail", JSON.stringify(data.data.user));
    return data.data.accessToken;
  },

  /**
   * logout a user from the application and delete the JWT token on the device
   */
  logOut: async () => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    if (accessToken) {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("user_detail");
    }
  },

  /**
   * register a new user from given values
   * @param email string
   * @param password string
   * @param firstName string
   * @param lastName string
   * @param age string
   * @returns the jwt token provided from the response
   */
  registerUser: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age: string
  ) => {
    const input = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    const data: AxiosResponse<userResponse> = await api.post("/register", input);
    await SecureStore.setItemAsync("access_token", data.data.accessToken);
    await SecureStore.setItemAsync("user_detail", JSON.stringify(data.data.user));
    return data.data.accessToken;
  },
});

export default AuthorizationService;
