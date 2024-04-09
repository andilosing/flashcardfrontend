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

export const getLoggedInUserApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(`${USERS_ENDPOINT}user`, options);
        if (result.data && result.data.user) {
            return result.data.user;
        } else {
            throw new Error("Users not found");
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzer:", error);
        throw error;
    }
};

export const changePasswordApi = async (oldPassword, newPassword) => {
    try {
        const options = {
            method: "POST",
            body: JSON.stringify({ oldPassword, newPassword }),
        };
        const result = await baseFetch(`${USERS_ENDPOINT}change-password`, options);
        
        if (result.message && result.message === "Password changed successfully") {
            return result.data; 
        } else {
            throw new Error(result.data.message || "Passwortänderung fehlgeschlagen");
        }
    } catch (error) {
        console.error("Fehler beim Ändern des Passworts:", error);
        throw error; 
    }
};
