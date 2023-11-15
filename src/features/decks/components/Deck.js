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

  useEffect( () => {
    async function fetchData(){
      await dispatch(getCardsForDeckAction(deck_id));
    }
    fetchData()
  }, [])

  const handleAddCardClick = () => {
    navigate(`/decks/${deck_id}/addCard`);
  };

  const handleShowCardsClick = () => {
    setShowCards(!showCards)
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
            <ul className="decks-cards-list">
              <div className="decks-cards-header-container">
                <h4>🇩🇪</h4>
                <h4>🇷🇺</h4>
              </div>
                {cardsInDecks && cardsInDecks.map((card, index) => (
                    <li key={index} className="card-item">
                        <div className="card-front">
                            
                            <p>{card.front_content}</p>
                        </div>
                        <div className="card-back">
                            
                            <p>{card.back_content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
}

export default Decks;
