import axios, { AxiosInstance } from "axios";
import { defaultAxiosInstance } from "./Api";
import * as SecureStore from "expo-secure-store";

const AuthorizationService = (api: AxiosInstance = defaultAxiosInstance) => ({
  logInUser: async (email: string, password: string) => {
    const input = {
      email: email,
      password: password,
    };
    console.log(input);
    const data = await api.post("/login", input);
    console.log(input);
    await SecureStore.setItemAsync("access_token", data.data.accessToken);
    console.log(data.data.accessToken);
    return data.data.accessToken;
  },

  logOut: async () => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    if (accessToken) {
      await SecureStore.deleteItemAsync("access_token");
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

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
