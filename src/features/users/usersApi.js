import { baseFetch } from "../../api/api";

const USERS_ENDPOINT = "/users/";

export const getAllUsersApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(USERS_ENDPOINT, options);
        if (result.data && result.data.users) {
            return result.data.users;
        } else {
            throw new Error("Users not found");
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzer:", error);
        throw error;
    }
};
