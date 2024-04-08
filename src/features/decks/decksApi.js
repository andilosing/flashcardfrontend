import { baseFetch } from "../../api/api";

const ENDPOINT = "/decks/";

export const getDecksApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(ENDPOINT, options);
     

        if (result.data && result.data.decks) {
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
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deckId, isActive }),
        };

        const result = await baseFetch(`${ENDPOINT}/status`, options);

        if (result.message && result.message === "Deck status updated successfully") {
        } else {
            throw new Error("Fehler beim Aktualisieren des Deck-Status");
        }

    } catch (error) {
        console.error("Fehler beim Aktualisieren des Deck-Status:", error);
        throw error;
    }
};

export const addDeckApi = async (deckName) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deckName: deckName }), 
        };

        const result = await baseFetch(ENDPOINT, options);

        if (result.data && result.data.deck) {
            return result.data.deck; 
        } else {
            throw new Error("Fehler beim Hinzufügen des Decks");
        }

    } catch (error) {
        console.error("Fehler beim Hinzufügen des Decks:", error);
        throw error;
    }
};

export const getDeckSharesApi = async (deckId) => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(`${ENDPOINT}${deckId}/shares`, options);

        if (result.data && result.data.shares && result.data.openRequests) {
            return {
                shares: result.data.shares,
                openRequests: result.data.openRequests
            };
        } else {
            throw new Error("Informationen über geteilte Decks und offene Anfragen nicht vorhanden");
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Informationen über geteilte Decks und offene Anfragen:", error);
        throw error;
    }
};

export const updateSharePermissionApi = async (shareId, newPermissionLevel) => {
    try {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPermissionLevel }),
        };

        const result = await baseFetch(`${ENDPOINT}shares/${shareId}`, options);

        if (result.data && result.data.share) {
            return result.data.share; 
        } else {
            throw new Error("Fehler beim Hinzufügen des Decks");
        }

    } catch (error) {
        console.error("Fehler beim Aktualisieren der Berechtigung:", error);
        throw error;
    }
};







