import {
  getLearningStackApi,
  updateLearningCardApi,
  setActiveStatusApi,
} from "./learningStackApi";
import { fetchLearningStack, updatedLearningCard } from "./learningStackSlice";
import {
  updateLearningStackStatus,
  setActiveStatus,
} from "../cards/cardsSlice";

export const getLearningStackAction =
  (germanCardsCount, russianCardsCount, fetchAllDue) => async (dispatch) => {
    try {
      if (typeof germanCardsCount !== "number" || germanCardsCount < 0) {
        throw new Error("Ungültige Anzahl deutscher Karten");
      }
      if (typeof russianCardsCount !== "number" || russianCardsCount < 0) {
        throw new Error("Ungültige Anzahl russischer Karten");
      }

      const learningStack = await getLearningStackApi(
        germanCardsCount,
        russianCardsCount,
        fetchAllDue
      );
      await dispatch(fetchLearningStack(learningStack));
      const cardIdsInLearningStack = learningStack.map((card) => card.card_id);
      await dispatch(updateLearningStackStatus(cardIdsInLearningStack));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
    }
  };

export const updateLearningCardAction =
  (progress_id, status, difficulty) => async (dispatch) => {
    try {
      if (!progress_id || status === "" || !difficulty) {
        throw new Error("Daten fehlen in Action");
      }
      if (difficulty < 1 || difficulty > 4) {
        throw new Error("Ungültige Schwierigkeit in Action");
      }

      if (status < 1 || status >20) {
        throw new Error("Ungültiger Status in Action");
      }

      const updatedCardId = await updateLearningCardApi(
        progress_id,
        status,
        difficulty
      );
      dispatch(updatedLearningCard(updatedCardId));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
    }
  };

export const setActiveStatusAction =
  (deckId, cardIds, activeStatus) => async (dispatch) => {
    try {
      if (
        !deckId ||
        cardIds.length === 0 ||
        (activeStatus !== true && activeStatus !== false)
      ) {
        throw new Error("Missing data to delete cards in Action");
      }

      await setActiveStatusApi(cardIds, activeStatus);
      dispatch(setActiveStatus({ deckId, cardIds, activeStatus }));
    } catch (error) {
      console.error("Error deleting cards in Action", error);
    }
  };
