import { baseFetch } from "../../api/api";

const ENDPOINT = "/properties/";

export const getLearningStackApi = async () => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch("/learning-stack/", options);
        console.log(result.data)
        if (result.data && result.data.learningStack) {
            return result.data.learningStack;
        } else {
            throw new Error("learning stack nicht vorhanden")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};

export const updateLearningCardApi = async (progress_id, status, difficulty) => {
    try {
        const updateCardData = {
            progress_id,
            status,
            difficulty
          };

        const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCardData)
          };
         
        const result = await baseFetch("/learning-stack/", options);

        if (result.data && result.data.cardId) {
            return result.data.cardId;
        } else {
            throw new Error("learning stack nicht vorhanden")
        }
        
    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error; 
    }
};
