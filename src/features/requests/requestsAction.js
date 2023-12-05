import { fetchRequestsApi, addRequestApi, fetchEligibleUsersForShareDeckApi, deleteRequestApi , handleRequestResponseApi} from "./requestsApi";
import { addRequest, fetchRequests, removeRequestBecauseOfResponse } from "./requestsSlice";
import { setEligibleUsersForShareDeck, removeRequest } from "../decks/decksSlice";

export const fetchRequestsAction = () => async (dispatch) => {
  try {
    const requests = await fetchRequestsApi();
    dispatch(fetchRequests(requests));
  } catch (error) {
    console.error("Fehler beim Abrufen von Anfragen in Action", error);
  }
};

export const addRequestAction = (requestType, receiverId, deckId, permissionLevel) => async (dispatch) => {
  try {
    if (!requestType || !receiverId || !deckId || !permissionLevel) {
      throw new Error("Missing data to add request in Action");
    }

    const newRequest = await addRequestApi(requestType, receiverId, deckId, permissionLevel);
    dispatch(addRequest(newRequest));
  } catch (error) {
    console.error("Fehler beim Hinzufügen einer Anfrage in Action", error);
  }
};

export const fetchEligibleUsersForShareDeckAction = (deckId) => async (dispatch) => {
  try {
    if (!deckId) {
      throw new Error("Deck ID is required for fetching eligible users");
    }

    const eligibleUsers = await fetchEligibleUsersForShareDeckApi(deckId);
    dispatch(setEligibleUsersForShareDeck({ deckId, users: eligibleUsers }));
  } catch (error) {
    console.error("Fehler beim Abrufen der berechtigten Benutzer für das Teilen des Decks", error);
  }
};


export const deleteShareRequestAction = (requestId, deckId) => async (dispatch) => {
  try {
    if (!requestId) {
      throw new Error("Request ID is required for deleting a request");
    }

    await deleteRequestApi(requestId);
    await dispatch(fetchEligibleUsersForShareDeckAction(deckId));
    dispatch(removeRequest({requestId, deckId}));


  } catch (error) {
    console.error("Fehler beim Löschen der Anfrage in Action", error);
  }
};

export const handleRequestResponseAction = (requestId, action) => async (dispatch) => {
  try {
    if (!requestId || !action) {
      throw new Error("Request ID and action are required for handling a request");
    }

    await handleRequestResponseApi(requestId, action);

    await dispatch(removeRequestBecauseOfResponse({ requestId}));

  } catch (error) {
    console.error("Fehler bei der Bearbeitung der Anfrage in Action", error);
  }
};



