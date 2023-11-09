import axios, { AxiosInstance } from "axios";
import { defaultAxiosInstance } from "./Api";
import * as SecureStore from "expo-secure-store";

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
    const accessToken = await SecureStore.getItemAsync("acces_token")
    if(accessToken){
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
    const data = await api.post("/login", input);
    await SecureStore.setItemAsync("access_token", data.data.accessToken);
    return data.data.accessToken;
  },

  /**
   * logout a user from the application and delete the JWT token on the device
   */
  logOut: async () => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    if (accessToken) {
      await SecureStore.deleteItemAsync("access_token");
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  /**
   * register a new user from given values
   * @param email string
   * @param password string
   * @returns the jwt token provided from the response
   */
  registerUser: async (email: string, password: string) => {
    const input = {
      email: email,
      password: password,
    };
    const data = await api.post("/register", input);
    await SecureStore.setItemAsync("access_token", data.data.accessToken);
    return data.data.accessToken;
  },
});

export default AuthorizationService;
