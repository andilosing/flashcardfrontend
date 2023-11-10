import { getLearningSessionsApi } from "./learningSessionsApi";
import { fetchLearningSessions  } from "./learningSessionSlice";

export const getLearningSessionsAction = () => async (dispatch) => {
    try {        
      const learningSessions = await getLearningSessionsApi()
      dispatch(fetchLearningSessions(learningSessions));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };
