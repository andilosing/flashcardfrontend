import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDecksAction, updateDeckStatusAction } from "../decksAction";
import styles from "./Deck.css";
import { FaPause, FaPlay, FaPlus, FaEllipsisH } from "react-icons/fa";


function Decks() {
  const decks = useSelector((state) => state.decks.decks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenuDeckId, setOpenMenuDeckId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDecksAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDeckClick = (deck_id) => {
    navigate(`/decks/${deck_id}`);
  };

  const handleStatusToggle = (event, deckId, currentStatus) => {
    event.stopPropagation();
    dispatch(updateDeckStatusAction(deckId, !currentStatus));
  };

  const handleAddDeckClick = () => {
    navigate(`/decks/add`);
  };

  const handleToggleMenu = (event, deckId) => {
    event.stopPropagation();
    setOpenMenuDeckId(openMenuDeckId === deckId ? null : deckId);
  };

  const handleShareDeck = (event, deckId, isOwner) => {
    event.stopPropagation();
    if (isOwner) {
      navigate(`/decks/share-deck/${deckId}`);
      setOpenMenuDeckId(null);
    }
  };

  const totalDueCardsFromActiveDecks = decks.reduce((total, deck) => {
    return deck.is_active ? total + deck.due_cards_count : total;
  }, 0);

  const totalQueueCardsFromActiveDecks = decks.reduce((total, deck) => {
    return deck.is_active ? total + deck.queue_cards_count : total;
  }, 0);

  return (
    <div className={`decks-container ${openMenuDeckId ? "blur" : ""}`}>
      {openMenuDeckId && (
        <div className="overlay2" onClick={() => setOpenMenuDeckId(null)}></div>
      )}
      <div className="decks-cards-header-container">
        <div className="decks-edit-buttons-container left"></div>
        <h3 className="decks-header">Decks</h3>
        <div className="decks-edit-buttons-container right">
          <div
            onClick={handleAddDeckClick}
            className="show-add-card-button button"
          >
            <FaPlus />
          </div>
        </div>
      </div>

      <div className="decks-summary">
        <div className="deck-count due-cards">Gesamt fällig: {totalDueCardsFromActiveDecks}</div>
        <div className="deck-count queue-cards">
          Gesamt queue: {totalQueueCardsFromActiveDecks}
        </div>
      </div>

      <ul className="decks-list">
        {decks.map((deck) => (
          <li
            key={deck.deck_id}
            className="decks-list-item"
            onClick={() => handleDeckClick(deck.deck_id)}
          >
            <div className="deck-name">{deck.name}</div>
            <div className="deck-count-container">
              <div className="deck-count card">
                Karten: {deck.total_card_count}
              </div>
              <div className="deck-count learning-stack">
                Lernen: {deck.learning_stack_count}
              </div>
              <div className="deck-count due-cards">
                Fällig: {deck.due_cards_count}
              </div>
              <div className="deck-count queue-cards">
                Queue: {deck.queue_cards_count}
              </div>
            </div>
            <div className="deck-status-cards-percentage-container">
              <div className="deck-status-cards-percentage bad">
                {deck.badPercentage}%
              </div>
              <div className="deck-status-cards-percentage mid">
                {deck.midPercentage}%
              </div>
              <div className="deck-status-cards-percentage good">
                {deck.goodPercentage}%
              </div>
            </div>
            <div className="deck-created-at">
              Erstellt am: {deck.created_at}
            </div>
            <div className="deck-footer">
              <div
                className={`deck-active-toggle ${
                  deck.is_active ? "active" : "inactive"
                }`}
                onClick={(event) =>
                  handleStatusToggle(event, deck.deck_id, deck.is_active)
                }
              >
                {deck.is_active ? <FaPlay /> : <FaPause />}
              </div>
              <div className="deck-owner">{deck.owner_username}</div>
            </div>
            {deck.is_owner && (
              <div
                className="deck-menu-button"
                onClick={(event) => handleToggleMenu(event, deck.deck_id)}
              >
                <FaEllipsisH />
              </div>
            )}
            {openMenuDeckId === deck.deck_id && deck.is_owner && (
              <ul className="deck-menu-actions">
                <li
                  onClick={(event) =>
                    handleShareDeck(event, deck.deck_id, deck.is_owner)
                  }
                >
                  Deck teilen
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Decks;
