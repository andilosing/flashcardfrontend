import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCardAction } from "../cardsAction";
import styles from "./AddCard.css"

function AddCard() {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const dispatch = useDispatch();

  const handleAddCard = async () => {
    if (frontText && backText) {
      try {

        await dispatch(addCardAction(1, frontText, backText));       
        setFrontText("");
        setBackText("");

      } catch (error) {
        console.error("Fehler beim Hinzufügen der Karte in Component:", error);
      }
    }
  };

  return (
    <div className="new-card-container">
      <h3 className="new-card-header">Karteikarte hinzufügen</h3>
      <div className="new-card-input-container">
      <div className="new-card-textarea-container">
                <label htmlFor="frontText" className="input-label">Vorderseite</label>
                <textarea
                    id="frontText"
                    className="new-card-textarea"
                    value={frontText}
                    onChange={(e) => setFrontText(e.target.value)}
                />
            </div>
            <div className="new-card-textarea-container">
                <label htmlFor="backText" className="input-label">Rückseite</label>
                <textarea
                    id="backText"
                    className="new-card-textarea"
                    value={backText}
                    onChange={(e) => setBackText(e.target.value)}
                />
            </div>
      </div>
      <button className="add-card-button button"onClick={handleAddCard}>Karte hinzufügen</button>
    </div>
  );
}

export default AddCard;
