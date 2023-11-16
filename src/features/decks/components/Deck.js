import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCardsForDeckAction } from "../../cards/cardsAction";
import styles from "./Decks.css";

function Decks() {
    const { deck_id } = useParams(); 
    const cardsInDecks = useSelector(
      (state) => state.cards.decks[deck_id]
    );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCards, setShowCards] = useState(false)

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect( () => {
    async function fetchData(){
      await dispatch(getCardsForDeckAction(deck_id));
    }
    fetchData()
    console.log("hole daten")
  }, [])

  const handleAddCardClick = () => {
    navigate(`/decks/${deck_id}/addCard`);
  };

  const handleShowCardsClick = () => {
    setShowCards(!showCards)
  };

  const handleCardItemClick = (card_id) => {
    navigate(`/decks/${deck_id}/addCard/${card_id}`);
  };

  const toggleCardSelection = (card_id) => {
    if (selectedCards.includes(card_id)) {
        setSelectedCards(selectedCards.filter(id => id !== card_id));
    } else {
        setSelectedCards([...selectedCards, card_id]);
    }
};

const handleDeleteSelectedCards = () => {
  console.log("löschmodus")
  console.log(selectedCards)
  // dispatch eine Aktion, um die Karten zu löschen
  // Beispiel: dispatch(deleteCardsAction(selectedCards));
  setSelectedCards([]);
  setDeleteMode(false);
};

const handleDeleteModeToggle = () => {
  if (deleteMode) {
      setSelectedCards([]);
  }
  setDeleteMode(!deleteMode);
};

 
  return (
    <div className="decks-cards-container">
        <h3 className="decks-cards-header">Karteikarten</h3>
        <button onClick={handleAddCardClick} className="show-add-card-button button">
            Karte Hinzufügen
        </button>
        <button onClick={handleShowCardsClick} className="show-cards-button button">
            {showCards ? "Karteikarten nicht anzeigen" : "Karten anzeigen"}
        </button>
        
        {showCards && (
            <>
            <div className="delete-mode-buttons-container">
              <button onClick={handleDeleteModeToggle} className="delete-mode-button button">
                  {deleteMode ? "Löschmodus deaktivieren" : "Löschmodus aktivieren"}
              </button>
                {deleteMode && (
                    <button onClick={handleDeleteSelectedCards} className="delete-cards-button button">
                        Ausgewählte Karten löschen
                    </button>
                )}
                </div>
            <ul className="decks-cards-list">
              <div className="decks-cards-header-container">
                <h4>🇩🇪</h4>
                <h4>🇷🇺</h4>
              </div>
                {cardsInDecks && cardsInDecks.map((card, index) => (
                    <li key={index} 
                    className={`card-item ${selectedCards.includes(card.card_id) ? 'delete-selected' : ''}`} 
                            onClick={() => deleteMode ? toggleCardSelection(card.card_id) : handleCardItemClick(card.card_id)}
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
            </>
        )}
    </div>
);
}

export default Decks;
