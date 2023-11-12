import { baseFetch } from "../../api/api";

const ENDPOINT = "/decks/";

export const getDecksApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(ENDPOINT, options);

        if (result.data && result.data.decks) {
            return result.data.decks;
        } else {
            throw new Error("decksnicht vorhanden")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};