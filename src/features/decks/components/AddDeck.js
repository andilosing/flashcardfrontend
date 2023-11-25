import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDeckAction } from "../decksAction"; 
import styles from "./AddDeck.css"; 

function AddDeck() {
  const [deckName, setDeckName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDisabled = !deckName;

  const handleDeckAction = async () => {
    if (deckName) {
      try {
        await dispatch(addDeckAction(deckName)); 
        navigate("/decks"); 
        setDeckName(""); 
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Decks:", error);
      }
    }
  };

  return (
    <div className="new-deck-container">
      <h3 className="new-deck-header">Deck hinzufügen</h3>
      <div className="new-deck-input-container">
        <label htmlFor="deckName" className="input-label">
          Deck-Name 
        </label>
        <input
          id="deckName"
          className="new-deck-input"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>
      <button
        className={`add-deck-button button ${isDisabled ? "disabled" : ""}`}
        onClick={handleDeckAction}
        disabled={isDisabled}
      >
        Deck hinzufügen
      </button>
    </div>
  );
}

export default AddDeck;
