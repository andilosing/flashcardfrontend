import { getAllUsersApi } from "./usersApi";
import { storeAllUsers } from "./usersSlice";

export const getAllUsersAction = () => async (dispatch) => {
    try {
        const users = await getAllUsersApi();
        dispatch(storeAllUsers(users));
    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzer:", error);
    }
};
