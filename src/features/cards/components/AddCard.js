import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCardAction, translateTextAction } from "../cardsAction";
import styles from "./AddCard.css";

function AddCard() {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const dispatch = useDispatch();
  const { deck_id } = useParams(); // Deck-ID aus URL extrahieren

  const isDisabled = !frontText || !backText;

  const handleAddCard = async () => {
    if (frontText && backText && deck_id) {
      try {
        await dispatch(addCardAction(deck_id, frontText, backText));
        setFrontText("");
        setBackText("");
      } catch (error) {
        console.error("Fehler beim Hinzufügen der Karte in Component:", error);
      }
    }
  };

  const handleTranslate = async (text, sourceLang, targetLang) => {
    try {
      const translation = await translateTextAction(
        text,
        sourceLang,
        targetLang
      );
      if (sourceLang === "DE") {
        setBackText(translation);
      } else {
        setFrontText(translation);
      }
    } catch (error) {
      console.error("Fehler beim Übersetzen", error);
    }
  };

  const addButtonStyle = {
    height: (frontText && !backText) || (!frontText && backText) ? "50px" : "",
  };

  return (
    <div className="new-card-container">
      <h3 className="new-card-header">Karteikarte hinzufügen</h3>
      <div className="new-card-input-container">
        <div className="new-card-textarea-container">
          <label htmlFor="frontText" className="input-label">
            Vorderseite
          </label>
          <textarea
            id="frontText"
            className="new-card-textarea"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
          />
        </div>
        <div className="new-card-textarea-container">
          <label htmlFor="backText" className="input-label">
            Rückseite
          </label>
          <textarea
            id="backText"
            className="new-card-textarea"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
          />
        </div>
      </div>
      {frontText && backText === "" && (
        <button
          className="translation-button button"
          onClick={() => handleTranslate(frontText, "DE", "RU")}
        >
          Übersetzen in Russisch
        </button>
      )}
      {backText && frontText === "" && (
        <button
          className="translation-button button"
          onClick={() => handleTranslate(backText, "RU", "DE")}
        >
          Übersetzen in Deutsch
        </button>
      )}
      <button
        className={`add-card-button button ${isDisabled ? "disabled" : ""}`}
        onClick={handleAddCard}
        disabled={isDisabled}
        style={addButtonStyle}
      >
        Karte hinzufügen
      </button>
    </div>
  );
}

export default AddCard;
