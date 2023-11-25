import { getDecksApi, updateDeckStatusApi, addDeckApi } from "./decksApi";
import { fetchDecks, updateDeckStatus } from "./decksSlice";


export const getDecksAction = () => async (dispatch) => {
    try {        
      const decks = await getDecksApi()
      dispatch(fetchDecks(decks));
    } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw Error
    }
  };

  export const updateDeckStatusAction = (deckId, isActive) => async (dispatch) => {
    try {
        // Aufrufen der API-Funktion zur Aktualisierung des Deck-Status
        await updateDeckStatusApi(deckId, isActive);
        
        // Dispatch der Aktion, um den Deck-Status im Redux Store zu aktualisieren
        dispatch(updateDeckStatus({deckId, isActive}));

    } catch (error) {
        console.error("Fehler beim Aktualisieren des Deck-Status:", error);
        throw Error
        // Optional: Dispatch einer Fehler-Aktion, falls erforderlich
    }
};

export const addDeckAction = (deckName) => async (dispatch) => {
  try {
      const newDeck = await addDeckApi(deckName);
      //dispatch(addDeck(newDeck));
  } catch (error) {
      console.error("Fehler beim Hinzufügen des Decks:", error);
      throw Error
      // Optional: Dispatch einer Fehler-Aktion, falls erforderlich
  }
};