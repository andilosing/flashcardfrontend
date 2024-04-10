import { getAllUsersApi , getLoggedInUserApi, changePasswordApi} from "./usersApi";
import { storeAllUsers, saveUser } from "./usersSlice";
import { showPopup } from "../popup/popupSlice";

export const getAllUsersAction = () => async (dispatch) => {
    try {
        const users = await getAllUsersApi();
        dispatch(storeAllUsers(users));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
        console.error("Fehler beim Abrufen der Benutzer:", error);
    }
};

export const getLoggedInUserAction = () => async (dispatch) => {
    try {        
      const user = await getLoggedInUserApi()
      dispatch(saveUser(user));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Login des Users:", error);

    }
  };

  export const changePasswordAction = (oldPassword, newPassword) => async (dispatch) => {
    try {
        const response = await changePasswordApi(oldPassword, newPassword);
        
    } catch (error) {
      console.log(error)
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Ändern des Passworts:", error);
      throw error
    }
};
