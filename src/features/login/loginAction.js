import { loginUserApi } from "./loginApi";
import { saveUser } from "../users/usersSlice";

export const loginUserAction = (username, password) => async (dispatch) => {
    try {        
      const user = await loginUserApi(username, password)
      dispatch(saveUser(user));
    } catch (error) {
      console.error("Fehler beim Login des Users:", error);
    }
  };