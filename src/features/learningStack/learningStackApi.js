import { baseFetch } from "../../api/api";

const ENDPOINT = "/learning-stack/";

export const getLearningStackApi = async (germanCardsCount, russianCardsCount) => {
    try {
        const options = { method: "GET" };
        const result = await baseFetch(`/learning-stack/?frontCardsCount=${germanCardsCount}&backCardsCount=${russianCardsCount}`, options);
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

export const setActiveStatusApi = async (cardIds, acitveStatus) => {
    try {
      const activeStatusData = {
        card_ids: cardIds,
        is_active: acitveStatus
      };
  
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeStatusData),
      };
  
      const result = await baseFetch(`${ENDPOINT}active/`, options);
  
      if (result.message !== "Active status for cards updated successfully") {
        throw new Error(`Server responded with status: ${result.status}`);
      }
  
    } catch (error) {
      console.error("Fehler beim Setzten des Statuses der Karten in der API:", error);
      throw error;
    }
  };
