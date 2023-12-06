import { baseFetch } from "../../api/api";

const ENDPOINT = "/sessions/";

export const getLearningSessionsApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(ENDPOINT, options);


        if (result.data && result.data.sessions) {
            return result.data.sessions
        } else {
            throw new Error("sessions nicht vorhanden")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};

export const getLearningSessionsForOtherUserApi = async (selectedUserId) => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(`${ENDPOINT}${selectedUserId}`, options);


        if (result.data && result.data.sessions && result.data.userId) {
            return result.data
        } else {
            throw new Error("sessions nicht vorhanden")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};