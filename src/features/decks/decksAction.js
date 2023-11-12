import { getDecksApi } from "./decksApi";
import { fetchDecks } from "./decksSlice";


export const getDecksAction = () => async (dispatch) => {
    try {        
      const decks = await getDecksApi()
      dispatch(fetchDecks(decks));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };