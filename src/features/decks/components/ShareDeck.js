import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDeckSharesAction,
  updateSharePermissionAction,
} from "../decksAction";
import {
  fetchEligibleUsersForShareDeckAction,
  addRequestAction,
  deleteShareRequestAction,
} from "../../requests/requestsAction";
import styles from "./ShareDeck.css";
import { FaTrash, FaUser, FaEye, FaEdit } from "react-icons/fa";
import { showPopup } from "../../popup/popupSlice";

function ShareDeck() {
  const { deck_id } = useParams();
  const { shares, openRequests, eligibleUsers } = useSelector(
    (state) => state.decks.sharedDecks[deck_id] || {}
  );
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [permission, setPermission] = useState("read");

  useEffect(() => {
    if (deck_id) {
      dispatch(getDeckSharesAction(deck_id));
      dispatch(fetchEligibleUsersForShareDeckAction(deck_id));
    }
  }, [deck_id, dispatch]);

  const handleShare = async () => {
    try {
      if (selectedUserId && permission && deck_id) {
        await dispatch(
          addRequestAction("SHARE_DECK", selectedUserId, deck_id, permission)
        );
        dispatch(showPopup({ message: `Anfrage erfolgreich gesendet`, type: 'success' }));
        setSelectedUserId("");
        setPermission("read");
        dispatch(getDeckSharesAction(deck_id));
        dispatch(fetchEligibleUsersForShareDeckAction(deck_id));
      }
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.log(error);
    }
  };

  const deleteShareRequest = async (requestId) => {
    try {
      if (requestId) {
        await dispatch(deleteShareRequestAction(requestId, deck_id));
      }
      dispatch(showPopup({ message: `Anfrage erfolgreich gelöscht`, type: 'success' }));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.log(error);
    }
  };

  const handleChangePermission = async (shareId, newPermission) => {
    try {
      const newPermissionLevel =
        newPermission === "schreiben" ? "write" : "read";
      await dispatch(
        updateSharePermissionAction(shareId, deck_id, newPermissionLevel)
      );
      dispatch(showPopup({ message: `Berechtigung erfolgreich geändert`, type: 'success' }));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error(error);
    }
  };

  return (
    <div className="share-deck-container">
      <h3 className="share-deck-header">Deck Berechtigungen</h3>

      <div className="share-deck-form">
        <h4>Neue Berechtigung erteilen</h4>
        <select
          className="share-deck-form input"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Benutzer auswählen</option>
          {eligibleUsers &&
            eligibleUsers.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username}
              </option>
            ))}
        </select>
        <select
          className="share-deck-form input"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
        >
          <option value="read">anzeigen</option>
          <option value="write">bearbeiten</option>
        </select>
        <button
          className="share-deck-button"
          onClick={handleShare}
          disabled={!selectedUserId}
        >
          Anfrage senden
        </button>
      </div>

      {openRequests && openRequests.length > 0 && (
        <div className="share-deck-section">
          <h4>Gesendete Berechtigungen</h4>
          <ul className="share-deck-list">
            {openRequests.map((request, index) => (
              <li key={index} className="shared-deck-item request">
                <div className="request-div">
                  <p>
                    <span className="request-span">
                      {" "}
                      <FaUser />
                    </span>
                    {request.receiver_username}
                  </p>
                  <p>
                    {request.permission_level === "write" ? (
                      <span className="request-span-2">
                        <span className="request-span">
                          <FaEdit />{" "}
                        </span>
                        bearbeiten
                      </span>
                    ) : request.permission_level === "read" ? (
                      <span className="request-span-2">
                        <span className="request-span">
                          <FaEye />{" "}
                        </span>
                        anzeigen
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div
                  className="shared-deck-delete-request button"
                  onClick={() => deleteShareRequest(request.request_id)}
                >
                  <FaTrash />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {shares && shares.length > 0 && (
        <div className="share-deck-section">
          <h4>Berechtigungen</h4>
          <ul className="share-deck-list">
            {shares.map((share, index) => (
              <li key={index} className="shared-deck-item">
                <p className="permissions-item">
                  <span className="request-span">
                    {" "}
                    <FaUser />
                  </span>
                  {share.shared_with_username}
                </p>
                <div className="share-deck-form permissions">
                <select
                  className="share-deck-form input permissions" 
                  value={
                    share.permission_level === "write" ? "schreiben" : "lesen"
                  }
                  onChange={(e) =>
                    handleChangePermission(share.share_id, e.target.value)
                  }
                >
                  <option value="lesen">Anschauen</option>
                  <option value="schreiben">Bearbeiten</option>
                </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShareDeck;
