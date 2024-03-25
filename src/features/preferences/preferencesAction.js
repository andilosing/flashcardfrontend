
import { getPreferencesApi, updatePreferencesApi, resetPreferencesApi } from "./preferencesApi";
import { setPreferences } from "./preferencesSlice";

export const getPreferencesAction = () => async (dispatch) => {
  try {
    const preferences = await getPreferencesApi();
    dispatch(setPreferences(preferences));
  } catch (error) {
    console.error("Error fetching preferences in Action:", error);
  }
};

export const updatePreferencesAction = (preferences) => async (dispatch) => {
    try {
      const { front_cards_count, back_cards_count, average_learning_time_good, average_learning_time_bad, learning_streak_good, learning_streak_bad, fetch_all_due_mode } = preferences;
  
      const numericValues = [front_cards_count, back_cards_count, average_learning_time_good, average_learning_time_bad, learning_streak_good, learning_streak_bad];
     
      if (!numericValues.every(value => Number.isInteger(value) && value >= 0)) {
        throw new Error("All numeric values must be positive integers.");
      }
  
      if (!(average_learning_time_good > average_learning_time_bad)) {
        throw new Error("Average learning times should be in descending order: good > bad.");
      }
  
      if (!(learning_streak_good > learning_streak_bad)) {
        throw new Error("Learning streaks should be in descending order: good >  bad.");
      }
  
      const validFetchModes = ['never', 'always', 'firstTimeDaily'];
      if (!validFetchModes.includes(fetch_all_due_mode)) {
        throw new Error(`Invalid fetch_all_due_mode. Valid options are: ${validFetchModes.join(', ')}.`);
      }
  
      await updatePreferencesApi(preferences);
      dispatch(setPreferences(preferences));
    } catch (error) {
      console.error("Error updating preferences in Action:", error);
    }
  };
  

export const resetPreferencesAction = () => async (dispatch) => {
  try {
    

    const defaultPreferences = await resetPreferencesApi();
    dispatch(setPreferences(defaultPreferences));
  } catch (error) {
    console.error("Error resetting preferences in Action:", error);
  }
};
