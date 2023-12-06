import { getLearningSessionsApi, getLearningSessionsForOtherUserApi } from "./learningSessionsApi";
import { fetchLearningSessions, fetchLearningSessionsForOtherUser  } from "./learningSessionSlice";

export const getLearningSessionsAction = () => async (dispatch) => {
    try {        
      const learningSessions = await getLearningSessionsApi()
      dispatch(fetchLearningSessions(learningSessions));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };

  export const getLearningSessionsForOtherUserAction = (selectedUserId) => async (dispatch) => {
    try {        
      const result = await getLearningSessionsForOtherUserApi(selectedUserId);
      if (result && result.sessions && result.userId) {
        dispatch(fetchLearningSessionsForOtherUser(result));
      } else {
        throw new Error("Learning Sessions für den ausgewählten Benutzer nicht gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Learning Sessions für einen anderen Benutzer:", error);
      throw error;
    }
};
