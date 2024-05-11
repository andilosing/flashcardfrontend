import React, { useState } from "react";
import { updateLearningCardAction } from "../learningStackAction";
import { useSelector, useDispatch } from "react-redux";
import styles from "./LearningCard.css";
import { showPopup } from "../../popup/popupSlice";
import { FaVolumeUp } from "react-icons/fa";

function LearningCard({ card, onCardUpdated, onUpdateDifficulty }) {
  const [showBack, setShowBack] = useState(false);
  const dispatch = useDispatch();

  const toggleCardSide = () => {
    setShowBack(!showBack);
  };

  const handleDifficulty = async (difficulty) => {
    try {
      const progress_id = card.progress_id;
      const status = card.status;
      onUpdateDifficulty(difficulty);

      await dispatch(
        updateLearningCardAction(progress_id, status, difficulty)
      ).then(() => {
        setShowBack(false);
        onCardUpdated();
      });
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: "error" }));
      console.log(error);
    }
  };

  const formatTextWithLineBreaks = (text) => {
    try {
      return text.split("\n").map((line, index, array) =>
        // Fügt kein <br> nach der letzten Zeile ein
        index === array.length - 1 ? (
          line
        ) : (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        )
      );
    } catch (error) {
      dispatch(showPopup({ message: `${error.message}`, type: "error" }));
      console.log(error);
    }
  };

  const textToSpeech = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU"; // Set the language
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="learning-card-container">
      <div className="card-box">
        <div className="front-text">
          {formatTextWithLineBreaks(card.front_content)}
        </div>
        {showBack ? (
           <div className="back-text" onClick={() => textToSpeech(card.back_content)}>
           <div className="text-container">
             {formatTextWithLineBreaks(card.back_content)}
           </div>  
             <FaVolumeUp className="speech-icon" />
         </div> ) : (
          <div className="back-text-placeholder"></div>
        )}
      </div>
      {showBack && (
        <div className="difficulty-container">
          <button
            className="difficulty-button button easy"
            onClick={() => handleDifficulty(1)}
          >
            sehr gut
          </button>
          <button
            className="difficulty-button button good"
            onClick={() => handleDifficulty(2)}
          >
            gut
          </button>
          <button
            className="difficulty-button button mid"
            onClick={() => handleDifficulty(3)}
          >
            mittel
          </button>
          <button
            className="difficulty-button button hard"
            onClick={() => handleDifficulty(4)}
          >
            schlecht
          </button>
        </div>
      )}

      {!showBack && (
        <div className="show-back-container">
          <button className="show-back-button button" onClick={toggleCardSide}>
            Rückseite zeigen
          </button>
        </div>
      )}
    </div>
  );
}

export default LearningCard;
