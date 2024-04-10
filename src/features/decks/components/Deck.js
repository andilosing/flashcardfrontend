import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCardsForDeckAction,
  deleteCardsAction,
  changeCardsDeckAction
} from "../../cards/cardsAction";
import { setActiveStatusAction } from "../../learningStack/learningStackAction";
import styles from "./Decks.css";
import { getDecksAction } from "../decksAction";
import {
  FaPlus,
  FaTrash,
  FaPause,
  FaPlay,
  FaExchangeAlt,
} from "react-icons/fa";
import { showPopup } from "../../popup/popupSlice";

function Decks() {
  const { deck_id } = useParams();
  const deckDetails = useSelector((state) => state.cards.decks[deck_id]);
  const userDecks = useSelector((state) => state.decks.decks);
  const cardsInDecks = deckDetails ? deckDetails.cards : [];
  const permissions = deckDetails ? deckDetails.permissions : {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [inactiveStatusMode, setInactiveStatusMode] = useState(false);
  const [activeStatusMode, setActiveStatusMode] = useState(false);

  const [changeDeckMode, setChangeDeckMode] = useState(false);
  const [selectedNewDeckId, setSelectedNewDeckId] = useState("");

  const [allSelected, setAllSelected] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const [filteredAndSortedCards, setFilteredAndSortedCards] =
    useState(cardsInDecks);

  useEffect(() => {
    const fetchCards = async () => {
      await dispatch(getCardsForDeckAction(deck_id));
    };

    const fetchDecks = async () => {
      await dispatch(getDecksAction());
    };

    if(!userDecks || userDecks.length === 0){
      fetchDecks()
    }

    if (!deckDetails) {
      fetchCards();
    }
  }, [deck_id, dispatch, deckDetails, userDecks]);




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
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
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
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.log("Fehler beim Setzen des inaktiven Status für Karten:", error);
    }
  };

  const handleDeleteModeToggle = () => {
    setDeleteMode(!deleteMode);
    setSelectedCards([]);
    setInactiveStatusMode(false);
    setActiveStatusMode(false);
    setChangeDeckMode(false);
  };

  const handleInactiveStatusModeToggle = () => {
    setInactiveStatusMode(!inactiveStatusMode);
    setSelectedCards([]);
    setDeleteMode(false);
    setActiveStatusMode(false);
    setChangeDeckMode(false);
  };

  const handleActiveStatusModeToggle = () => {
    setActiveStatusMode(!activeStatusMode);
    setSelectedCards([]);
    setDeleteMode(false);
    setInactiveStatusMode(false);
    setChangeDeckMode(false);
  };

  const handleDeckChangeModeToggle = () => {
    setChangeDeckMode(!changeDeckMode);
    setSelectedCards([]);
    setDeleteMode(false);
    setInactiveStatusMode(false);
    setActiveStatusMode(false);
  };

  const handleSelectNewDeck = (event) => {
    setSelectedNewDeckId(event.target.value);
  };

  const handleMoveSelectedCardsToNewDeck = async () => {
    if (selectedCards.length > 0 && selectedNewDeckId) {
      dispatch(changeCardsDeckAction(selectedCards, deck_id, selectedNewDeckId));
      setSelectedCards([]);
      setChangeDeckMode(false);
      setSelectedNewDeckId("");
    }
  };

  const selectAllCardsBasedOnStatus = () => {
    if (allSelected) {
      // Deselektieren aller Karten
      setSelectedCards([]);
    } else {
      // Auswählen aller sichtbaren Karten
      const newSelectedCards = cardsInDecks
        .filter((card) => {
          if (inactiveStatusMode) {
            return card.is_active !== false;
          } else if (activeStatusMode) {
            return card.is_active !== true;
          }
          return true;
        })
        .map((card) => card.card_id);
      setSelectedCards(newSelectedCards);
    }
    setAllSelected(!allSelected);
  };

  const toggleCardStatus = async (card) => {
    try {
      const newStatus =
        card.is_active === null || card.is_active === false ? true : false;
      await dispatch(setActiveStatusAction(deck_id, [card.card_id], newStatus));
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: 'error' }));
      console.error("Fehler beim Ändern des Kartenstatus:", error);
    }
  };

  const filterCardsByText = (query) => {
    if (!query) return cardsInDecks;
    const searchQuery = query ? query.toString().toLowerCase() : "";
    const cardsCopy = [...cardsInDecks];
    return cardsCopy.filter(
      (card) =>
        card.front_content.toLowerCase().includes(searchQuery) ||
        card.back_content.toLowerCase().includes(searchQuery)
    );
  };

  const sortCards = (cards) => {
    const cardsCopy = [...cards];
    return cardsCopy.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (sortField === "front_content" || sortField === "back_content") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    const filteredCards = filterCardsByText(searchQuery);
    const sortedCards = sortCards(filteredCards);
    setFilteredAndSortedCards(sortedCards);
  }, [searchQuery, sortField, sortOrder, cardsInDecks]);

  function highlightMatch(text, query) {
    const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
    if (matchIndex === -1) {
      return <span>{text}</span>;
    }
    const beforeMatch = text.substring(0, matchIndex);
    const matchText = text.substring(matchIndex, matchIndex + query.length);
    const afterMatch = text.substring(matchIndex + query.length);
    return (
      <span>
        {beforeMatch}
        <span style={{ backgroundColor: "skyblue" }}>{matchText}</span>
        {afterMatch}
      </span>
    );
  }

  function highlightAndFormatText(text, query) {
    return text.split("\n").map((line, index) => {
      const highlightedLine = highlightMatch(line, query);
      return (
        <React.Fragment key={index}>
          {highlightedLine}
          {index < text.split("\n").length - 1 ? <br /> : ""}
        </React.Fragment>
      );
    });
  }

  return (
    <div className="decks-cards-container">
      <h3 className="decks-cards-header">Karteikarten</h3>
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

              <button
                onClick={handleDeckChangeModeToggle}
                className={`change-deck-mode-button button ${
                  changeDeckMode ? "active" : ""
                }`}
              >
                <FaExchangeAlt />
              </button>

              <div
                onClick={handleAddCardClick}
                className="show-add-card-button button"
              >
                <FaPlus />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="decks-search-filter-container">
        <input
          type="text"
          placeholder="Suche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="sort-options">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="select-filter"
          >
            <option value="created_at">Erstellt</option>
            <option value="updated_at">Updated</option>
            <option value="front_content">Deutsch</option>
            <option value="back_content">Russisch</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select-filter"
          >
            <option value="asc">Aufst.</option>
            <option value="desc">Abst.</option>
          </select>
        </div>
      </div>
      <ul className="decks-cards-list">
        {deleteMode ||
        inactiveStatusMode ||
        activeStatusMode ||
        changeDeckMode ? (
          <button
            onClick={selectAllCardsBasedOnStatus}
            className="select-all-button button"
          >
            {allSelected ? "Alle abwählen" : "Alle auswählen"}
          </button>
        ) : null}
        
        <div className="deck-cards-list-items-container">
          {filteredAndSortedCards &&
            filteredAndSortedCards
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
                    deleteMode && selectedCards.includes(card.card_id)
                      ? "delete-selected"
                      : inactiveStatusMode &&
                        selectedCards.includes(card.card_id)
                      ? "inactive-selected"
                      : activeStatusMode && selectedCards.includes(card.card_id)
                      ? "active-selected"
                      : changeDeckMode && selectedCards.includes(card.card_id)
                      ? "change-deck-selected"
                      : ""
                  }`}
                  onClick={() =>
                    deleteMode ||
                    inactiveStatusMode ||
                    activeStatusMode ||
                    changeDeckMode
                      ? toggleCardSelection(card.card_id)
                      : userCanEdit && handleCardItemClick(card.card_id)
                  }
                >
                  <div
                    className={`card-status ${
                      card.is_active === true
                        ? "active"
                        : card.is_active === false
                        ? "inactive"
                        : "null-status"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCardStatus(card);
                    }}
                  >
                    {card.is_active === true ? (
                      <FaPlay />
                    ) : card.is_active === false ? (
                      <FaPause />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="card-content">
                    <div className="card-front">
                      {highlightAndFormatText(card.front_content, searchQuery)}
                    </div>
                    <div className="card-back">
                      {highlightAndFormatText(card.back_content, searchQuery)}
                    </div>
                  </div>
                </li>
              ))}
        </div>
        {userCanEdit && changeDeckMode && (
          <div className="change-deck-container">
            <select onChange={handleSelectNewDeck} value={selectedNewDeckId} className="select-deck">
              <option value="">Wähle ein Deck...</option>
              {userDecks &&
                userDecks
                  .filter(
                    (deck) => ((deck.is_owner || deck.permission_level === "write") && (String(deck.deck_id) !== deck_id))
                  )
                  .map((deck) => (
                    <option key={deck.deck_id} value={deck.deck_id}>
                      {deck.name}
                    </option>
                  ))}
            </select>
          </div>
        )}
        <div className="deck-cards-action-buttons-container">
          {deleteMode && userCanEdit && (
            <button
              onClick={handleDeleteSelectedCards}
              className={`deck-action-button delete button ${
                selectedCards.length > 0 ? "active" : ""
              }`}
              disabled={selectedCards.length <= 0}
            >
              löschen
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
              inaktiv
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
              aktiv
            </button>
          )}
    
          {changeDeckMode && userCanEdit && (
            <button
              onClick={handleMoveSelectedCardsToNewDeck}
              className={`deck-action-button change-deck button ${
                selectedCards.length > 0 && selectedNewDeckId ? "active" : ""
              }`}
              disabled={selectedCards.length <= 0 || !selectedNewDeckId}
            >
              Karten verschieben
            </button>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Decks;
