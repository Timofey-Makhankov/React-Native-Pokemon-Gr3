import { AxiosInstance } from "axios";
import { User, LogInUser } from "../Types/UserType";
import { defaultAxiosInstance } from "./Api";

const UserService = {
  getUserById: async (userID: string): Promise<User> => {
    const { data } = await defaultAxiosInstance.get<User>(`/user/${userID}`);
    return data;
  },

  addUser: (user: User) => {
    return defaultAxiosInstance.post("/user/register", user).then((res) => {
      return res.data;
    });
  },

  login: async (param: LogInUser) => {
    const answer = await defaultAxiosInstance.post("login", param);
    return answer;
  },
};

export default UserService;
