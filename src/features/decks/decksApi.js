import { baseFetch } from "../../api/api";

const ENDPOINT = "/decks/";

export const getDecksApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(ENDPOINT, options);

        if (result.data && result.data.decks) {
            console.log(result.data.decks)
            return result.data.decks;
        } else {
            throw new Error("decks nicht vorhanden")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};

export const updateDeckStatusApi = async (deckId, isActive) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deckId, isActive }),
        };

        const result = await baseFetch(`${ENDPOINT}/status`, options);

        if (result.message && result.message === "Deck status updated successfully") {
            console.log("status erfolgreich geupdatet")
        } else {
            throw new Error("Fehler beim Aktualisieren des Deck-Status");
        }

    } catch (error) {
        console.error("Fehler beim Aktualisieren des Deck-Status:", error);
        throw error;
    }
};