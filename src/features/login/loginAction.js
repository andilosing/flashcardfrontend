import { loginUserApi } from "./loginApi";
//import { fetchLearningStack, updatedLearningCard  } from "./learningStackSlice";

export const loginUserAction = (username, password) => async (dispatch) => {
    try {        
      const user = await loginUserApi(username, password)
      //dispatch(fetchLearningSessions(learningSessions));
    } catch (error) {
      console.error("Fehler beim Login des Users:", error);
      throw error
    }
  };