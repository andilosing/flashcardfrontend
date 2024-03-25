import { baseFetch } from "../../api/api";

const PREFERENCES_ENDPOINT = "/preferences/";

export const getPreferencesApi = async () => {
  try {
    const options = { method: "GET" };
    const result = await baseFetch(PREFERENCES_ENDPOINT, options);

    if (result.data && result.data.preferences) {
      return result.data.preferences;
    } else {
      throw new Error("Preferences not found");
    }
  } catch (error) {
    console.error("Error fetching preferences in API:", error);
    throw error;
  }
};

export const updatePreferencesApi = async (preferences) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    };

    const result = await baseFetch(PREFERENCES_ENDPOINT, options);

    if (result.data && result.data.preferences) {
      return result.data.preferences;
    } else {
      throw new Error("Preferences not updated");
    }
  } catch (error) {
    console.error("Error updating preferences in API:", error);
    throw error;
  }
};

export const resetPreferencesApi = async () => {
  try {
    const options = { method: "PUT" }; 
    const result = await baseFetch(`${PREFERENCES_ENDPOINT}reset`, options);

    if (result.data && result.data.preferences) {
      return result.data.preferences;
    } else {
      throw new Error("Preferences not reset");
    }
  } catch (error) {
    console.error("Error resetting preferences in API:", error);
    throw error;
  }
};