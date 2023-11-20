import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCardsForDeckAction,
  deleteCardsAction,
} from "../../cards/cardsAction";
import { setActiveStatusAction } from "../../learningStack/learningStackAction";
import styles from "./Decks.css";
import { FaPlus, FaTrash, FaPause, FaPlay } from "react-icons/fa";

function Decks() {
  const { deck_id } = useParams();
  const deckDetails = useSelector((state) => state.cards.decks[deck_id]);
  const cardsInDecks = deckDetails ? deckDetails.cards : [];
  const permissions = deckDetails ? deckDetails.permissions : {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [inactiveStatusMode, setInactiveStatusMode] = useState(false);
  const [activeStatusMode, setActiveStatusMode] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      await dispatch(getCardsForDeckAction(deck_id));
    };

    if (!deckDetails) {
      fetchCards();
      console.log("hole karten für deck ");
    }

    console.log(permissions);
  }, [deck_id, dispatch, deckDetails]);

  const userCanEdit =
    permissions.is_owner || permissions.permission_level === "write";

  const handleAddCardClick = () => {
    navigate(`/decks/${deck_id}/addCard`);
  };

  const handleCardItemClick = (card_id) => {
    navigate(`/decks/${deck_id}/addCard/${card_id}`);
  };

  const toggleCardSelection = (card_id) => {
    if (selectedCards.includes(card_id)) {
      setSelectedCards(selectedCards.filter((id) => id !== card_id));
    } else {
      setSelectedCards([...selectedCards, card_id]);
    }
  };

  const handleDeleteSelectedCards = async () => {
    try {
      await dispatch(deleteCardsAction(deck_id, selectedCards));
      setSelectedCards([]);
      setDeleteMode(false);
    } catch (error) {
      console.log("fehler in Deck beim Löschen der Karteikarte");
    }
  };

  const handleSetCardsInactive = async () => {
    try {
      if (selectedCards.length > 0) {
        await dispatch(setActiveStatusAction(deck_id, selectedCards, false));
        setSelectedCards([]);
        setInactiveStatusMode(false);
      }
    } catch (error) {
      console.log("Fehler beim Setzen des inaktiven Status für Karten:", error);
    }
  };

  const handleSetCardsActive = async () => {
    try {
      if (selectedCards.length > 0) {
        await dispatch(setActiveStatusAction(deck_id, selectedCards, true));
        setSelectedCards([]);
        setActiveStatusMode(false);
      }
    } catch (error) {
      console.log("Fehler beim Setzen des inaktiven Status für Karten:", error);
    }
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(!deleteMode);
    setSelectedCards([]);
    setInactiveStatusMode(false);
    setActiveStatusMode(false);
  };

  const handleInactiveStatusModeToggle = () => {
    setInactiveStatusMode(!inactiveStatusMode);
    setSelectedCards([]);
    setDeleteMode(false);
    setActiveStatusMode(false);
  };

  const handleActiveStatusModeToggle = () => {
    setActiveStatusMode(!activeStatusMode);
    setSelectedCards([]);
    setDeleteMode(false);
    setInactiveStatusMode(false);
  };

  const displayIsActiveStatus = (isActive) => {
    if (isActive === true) {
      return "aktiv in stapel";
    } else if (isActive === false) {
      return "inaktiv in stapel";
    } else {
      return "nicht in stapel";
    }
  };

  const selectAllCardsBasedOnStatus = () => {
    const newSelectedCards = cardsInDecks
      .filter((card) => {
        if (inactiveStatusMode) {
          return card.is_active !== false;
        } else if (activeStatusMode) {
          return card.is_active !== true;
        } else {
          return true;
        }
      })
      .map((card) => card.card_id);
    setSelectedCards(newSelectedCards);
  };

  return (
    <div className="decks-cards-container">
      <div className="decks-cards-header-container">
        <div className="decks-edit-buttons-container left">
          <div
            onClick={handleInactiveStatusModeToggle}
            className={`inactive-mode-button button ${
              inactiveStatusMode ? "active" : ""
            }`}
          >
            <FaPause />
          </div>
          <div
            onClick={handleActiveStatusModeToggle}
            className={`active-mode-button button ${
              activeStatusMode ? "active" : ""
            }`}
          >
            <FaPlay />
          </div>
        </div>
        <h3 className="decks-cards-header">Karteikarten</h3>
        <div className="decks-edit-buttons-container right">
        {userCanEdit && (
          <>
            <div
              onClick={handleDeleteModeToggle}
              className={`delete-mode-button button ${
                deleteMode ? "active" : ""
              }`}
            >
              <FaTrash />
            </div>

            <div
              onClick={handleAddCardClick}
              className="show-add-card-button button"
            >
              <FaPlus />
            </div>
            </>
          
        )}
        </div>
        {deleteMode || inactiveStatusMode || activeStatusMode ? (
          <button
            onClick={selectAllCardsBasedOnStatus}
            className="select-all-button button"
          >
            Alle auswählen
          </button>
        ) : null}
      </div>
      <ul className="decks-cards-list">
      <div className="deck-cards-list-items-container">
        {cardsInDecks &&
          cardsInDecks
            .filter((card) => {
              // Filter basierend auf dem Modus
              if (inactiveStatusMode) {
                return card.is_active !== false;
              } else if (activeStatusMode) {
                return card.is_active !== true;
              }
              return true;
            })
            .map((card, index) => (
              <li
                key={index}
                className={`card-item ${
                  card.is_active === true
                    ? "active"
                    : card.is_active === false
                    ? "inactive"
                    : "null-status"
                } ${
                  deleteMode && selectedCards.includes(card.card_id)
                    ? "delete-selected"
                    : inactiveStatusMode && selectedCards.includes(card.card_id)
                    ? "inactive-selected"
                    : activeStatusMode && selectedCards.includes(card.card_id)
                    ? "active-selected"
                    : ""
                }`}
                onClick={() =>
                  deleteMode || inactiveStatusMode || activeStatusMode
                    ? toggleCardSelection(card.card_id)
                    : userCanEdit && handleCardItemClick(card.card_id)
                }
              >
                <div className="card-front">
                  <p>{card.front_content}</p>
                </div>
                <div className="card-back">
                  <p>{card.back_content}</p>
                </div>
              </li>
            ))}
            </div>
            <div className="deck-cards-action-buttons-container">
             {deleteMode && userCanEdit && (
        <button
          onClick={handleDeleteSelectedCards}
          className={`deck-action-button delete button ${
            selectedCards.length > 0 ? "active" : ""
          }`}
          disabled={selectedCards.length <= 0}
        >
          Karten löschen
        </button>
      )}
      {inactiveStatusMode && (
        <button
          onClick={handleSetCardsInactive}
          className={`deck-action-button inactive-mode button ${
            selectedCards.length > 0 ? "active" : ""
          }`}
          disabled={selectedCards.length <= 0}
        >
          Als inaktiv markieren
        </button>
      )}
      {activeStatusMode && (
        <button
          onClick={handleSetCardsActive}
          className={`deck-action-button active-mode button ${
            selectedCards.length > 0 ? "active" : ""
          }`}
          disabled={selectedCards.length <= 0}
        >
          Als activ markieren
        </button>
      )}
      </div>
      </ul>
    </div>
  );
}

export default Decks;
