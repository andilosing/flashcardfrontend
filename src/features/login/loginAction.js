import { loginUserApi } from "./loginApi";
import { loginUser } from "../users/usersSlice";

export const loginUserAction = (username, password) => async (dispatch) => {
    try {        
      const user = await loginUserApi(username, password)
      dispatch(loginUser(user));
    } catch (error) {
      console.error("Fehler beim Login des Users:", error);
      throw error
    }
  };