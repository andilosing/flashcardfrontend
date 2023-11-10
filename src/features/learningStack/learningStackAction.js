import { getLearningStackApi, updateLearningCardApi } from "./learningStackApi";
import { fetchLearningStack, updatedLearningCard  } from "./learningStackSlice";


export const getLearningStackAction = () => async (dispatch) => {
    try {        
      const learingStack = await getLearningStackApi()
      dispatch(fetchLearningStack(learingStack));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };

  export const updateLearningCardAction = (progress_id, status, difficulty) => async (dispatch) => {
    try {   
      if(!progress_id || status === "" || !difficulty) {
        throw new Error ("Daten fehlen in Action")
      }    
      if (difficulty < 1 || difficulty > 4) {
        throw new Error("Ungültige Schwierigkeit in Action");
      }

      if (status < 1 || status > 10) {
        throw new Error("Ungültiger Status in Action");
      }

      const updatedCardId = await updateLearningCardApi(progress_id, status, difficulty)
      dispatch(updatedLearningCard(updatedCardId));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };