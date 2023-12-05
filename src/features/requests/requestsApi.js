import { baseFetch } from "../../api/api";

const REQUESTS_ENDPOINT = "/requests/";


export const addRequestApi = async (
  requestType,
  receiverId,
  deckId,
  permissionLevel
) => {
  try {
    const requestData = {
      requestType,
      receiverId,
      deckId,
      permissionLevel,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    const result = await baseFetch(REQUESTS_ENDPOINT, options);

    if (result.data && result.data.request) {
      return result.data.request;
    } else {
      throw new Error("Request not added");
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen der Anfrage in der API:", error);
    throw error;
  }
};

export const fetchRequestsApi = async () => {
  try {
    const options = { method: "GET" };
    const result = await baseFetch(`${REQUESTS_ENDPOINT}open`, options);

    if (result.data && result.data.requests) {
      return result.data.requests;
    } else {
      throw new Error("Requests not found");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Anfragen in der API:", error);
    throw error;
  }
};

export const fetchEligibleUsersForShareDeckApi = async (deckId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await baseFetch(
      `${REQUESTS_ENDPOINT}eligible-users/${deckId}`,
      options
    );

    if (result.data && result.data.users) {
      return result.data.users;
    } else {
      throw new Error("Eligible users not found");
    }
  } catch (error) {
    console.error(
      "Fehler beim Abrufen der berechtigten Benutzer in der API:",
      error
    );
    throw error;
  }
};

export const deleteRequestApi = async (requestId) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await baseFetch(`${REQUESTS_ENDPOINT}${requestId}`, options);

    if (result.message !== "Request deleted successfully") {
      throw new Error(`Server responded with status: ${result.status}`);
    }
  } catch (error) {
    console.error("Fehler beim Löschen der Anfrage in der API:", error);
    throw error;
  }
};

export const handleRequestResponseApi = async (requestId, action) => {
  try {
    const options = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    };

    const result = await baseFetch(`${REQUESTS_ENDPOINT}response/${requestId}`, options);

    if (result.message && (result.message === "Request accepted successfully" || result.message === "Request declined successfully")) {
      return result;
    } else {
      throw new Error(`Server responded with an error: ${result.status}`);
    }

  } catch (error) {
    console.error("Fehler bei der Verarbeitung der Anfrage in der API:", error);
    throw error;
  }
};

// ---------------- Notifications-------------------------------

const NOTIFICATIONS_ENDPOINT = "/notifications/";


export const getNotificationsForUserApi = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await baseFetch(NOTIFICATIONS_ENDPOINT, options);
    console.log(result)

    if (result.data && result.data.notifications) {
      return result.data.notifications;
    } else {
      throw new Error("Notifications not found");
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Benachrichtigungen in der API:", error);
    throw error;
  }
};

export const updateLastViewedAtForUserApi = async () => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await baseFetch(`${NOTIFICATIONS_ENDPOINT}`, options);

    if (result.message !== "Last viewed at updated successfully") {
      throw new Error(`Server responded with status: ${result.status}`);
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren des letzten Anzeigezeitpunkts in der API:", error);
    throw error;
  }
};



