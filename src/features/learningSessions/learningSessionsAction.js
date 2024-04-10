import { getLearningSessionsApi, getLearningSessionsForOtherUserApi } from "./learningSessionsApi";
import { fetchLearningSessions, fetchLearningSessionsForOtherUser  } from "./learningSessionSlice";
import { showPopup } from "../popup/popupSlice";

export const getLearningSessionsAction = () => async (dispatch) => {
    try {        
      const learningSessions = await getLearningSessionsApi()
      dispatch(fetchLearningSessions(learningSessions));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
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
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Abrufen der Learning Sessions für einen anderen Benutzer:", error);
    }
};
