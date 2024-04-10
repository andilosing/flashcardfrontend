import { getDecksApi, updateDeckStatusApi, addDeckApi, getDeckSharesApi, updateSharePermissionApi } from "./decksApi";
import { fetchDecks, updateDeckStatus, storeDeckShares, updateSharePermission } from "./decksSlice";
import { showPopup } from "../popup/popupSlice";


export const getDecksAction = () => async (dispatch) => {
    try {        
      const decks = await getDecksApi()
      dispatch(fetchDecks(decks));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
    }
  };

  export const updateDeckStatusAction = (deckId, isActive) => async (dispatch) => {
    try {
        // Aufrufen der API-Funktion zur Aktualisierung des Deck-Status
        await updateDeckStatusApi(deckId, isActive);
        
        // Dispatch der Aktion, um den Deck-Status im Redux Store zu aktualisieren
        dispatch(updateDeckStatus({deckId, isActive}));

    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
        console.error("Fehler beim Aktualisieren des Deck-Status:", error);
        // Optional: Dispatch einer Fehler-Aktion, falls erforderlich
    }
};

export const addDeckAction = (deckName) => async (dispatch) => {
  try {
      const newDeck = await addDeckApi(deckName);
      //dispatch(addDeck(newDeck));
  } catch (error) {
    dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Hinzufügen des Decks:", error);
      // Optional: Dispatch einer Fehler-Aktion, falls erforderlich
  }
};

export const getDeckSharesAction = (deckId) => async (dispatch) => {
  try {        
      // Abrufen der Informationen über die geteilten Decks und offene Anfragen
      const { shares, openRequests } = await getDeckSharesApi(deckId);

      // Speichern der Informationen im Redux Store
      dispatch(storeDeckShares({ deckId, shares, openRequests }));
  } catch (error) {
    dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Abrufen der Informationen über geteilte Decks und offene Anfragen:", error);
      // Optional: Dispatch einer Fehler-Aktion, falls erforderlich
  }
};

export const updateSharePermissionAction = (shareId, deckId, newPermissionLevel) => async (dispatch) => {
  try {
    await updateSharePermissionApi(shareId, newPermissionLevel);
    
    dispatch(updateSharePermission({ shareId, deckId, newPermissionLevel }));

  } catch (error) {
    dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
    console.error("Fehler beim Aktualisieren der Berechtigung:", error);
    throw error
  }
};
