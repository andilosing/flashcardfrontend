import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCardsForDeckAction, deleteCardsAction } from "../../cards/cardsAction";
import styles from "./Decks.css";
import { FaPlus, FaTrash } from "react-icons/fa";

function Decks() {
  const { deck_id } = useParams();
  const cardsInDecks = useSelector((state) => state.cards.decks[deck_id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      await dispatch(getCardsForDeckAction(deck_id));
    };

    if (!cardsInDecks || !cardsInDecks[deck_id] || cardsInDecks[deck_id].length === 0) {
      fetchCards();
      console.log("hole karten für deck ")
    }
  }, [deck_id, dispatch, cardsInDecks]);

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

  const handleDeleteModeToggle = () => {
    if (deleteMode) {
      setSelectedCards([]);
    }
    setDeleteMode(!deleteMode);
  };

  return (
    <div className="decks-cards-container">
      <div className="decks-cards-header-container">
        <div
          onClick={handleDeleteModeToggle}
          className={`delete-mode-button button ${deleteMode ? "active": ""}`}
        >
           <FaTrash />
        </div>
        <h3 className="decks-cards-header">Karteikarten</h3>
        <div
          onClick={handleAddCardClick}
          className="show-add-card-button button"
        >
          <FaPlus />
        </div>
      </div>
      {deleteMode && (
        <button
          onClick={handleDeleteSelectedCards}
          className={`delete-cards-button button ${
            selectedCards.length > 0 ? "active" : ""
          }`}
          disabled={selectedCards.length <= 0}
        >
         Karten löschen
        </button>
      )}
      <ul className="decks-cards-list">
        {cardsInDecks &&
          cardsInDecks.map((card, index) => (
            <li
              key={index}
              className={`card-item ${card.in_learning_stack ? "in-learning-stack" : ""} ${
                selectedCards.includes(card.card_id) ? "delete-selected" : ""
              }`}
              onClick={() =>
                deleteMode
                  ? toggleCardSelection(card.card_id)
                  : handleCardItemClick(card.card_id)
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
      </ul>
    </div>
  );
}

export default Decks;
