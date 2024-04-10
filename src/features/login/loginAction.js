import { loginUserApi } from "./loginApi";
import { saveUser } from "../users/usersSlice";
import { showPopup } from "../popup/popupSlice";

export const loginUserAction = (username, password) => async (dispatch) => {
    try {        
      const user = await loginUserApi(username, password)
      dispatch(saveUser(user));
    } catch (error) {
      throw error
    }
  };