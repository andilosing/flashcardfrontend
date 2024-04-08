import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLearningStackAction } from "../learningStackAction";
import { getPreferencesAction } from "../../preferences/preferencesAction";
import { updateLastLearningDay, updateLearningStreak } from "../../users/usersSlice";
import LearningCard from "./LearningCard";
import styles from "./LearningStack.css";

function LearningStack() {
  const dispatch = useDispatch();
  const learningStack = useSelector(
    (state) => state.learningStack.learningStack
  );
  const preferences = useSelector((state) => state.preferences.preferences);
  const lastLearningDay = useSelector((state) => state.users.user?.lastLearningDay);

  

  const [cardsAmount, setCardsAmount] = useState(0);
  const [doneCards, setDoneCards] = useState(0);
  const [easyCount, setEasyCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [midCount, setMidCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [germanCardsCount, setGermanCardsCount] = useState(preferences.front_cards_count || 10);
  const [russianCardsCount, setRussianCardsCount] = useState(preferences.back_cards_count || 10);
  const [fetchAllDue, setFetchAllDue] = useState(false);
  const [learnedToday, setLearnedToday] = useState(false);

  //updated last learning day und learning streak 
  useEffect(() => {
    if (doneCards > 0 && !learnedToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastLearnedDate = lastLearningDay ? new Date(lastLearningDay) : null;
      lastLearnedDate?.setHours(0, 0, 0, 0);

      if (!lastLearnedDate || today.getTime() !== lastLearnedDate.getTime()) {

        dispatch(updateLastLearningDay(new Date().toISOString())); 
  
        if (lastLearnedDate) {
          const timeDiff = today.getTime() - lastLearnedDate.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
          if (daysDiff > 1) {
            dispatch(updateLearningStreak(1)); 
          } else if (daysDiff === 1) {
            dispatch(updateLearningStreak('increment'));
          }
        } else {
          dispatch(updateLearningStreak(1)); 
        }
  
        setLearnedToday(true);
      }
    }
  }, [doneCards]);

  //zuständig für fetch all mode
  useEffect(() => {
    const setFetchAllDueBasedOnPreferences = () => {
      if (!preferences) {
        setFetchAllDue(false);
        return;
      }
  
      switch (preferences.fetch_all_due_mode) {
        case 'always':
          setFetchAllDue(true);
          break;
        case 'never':
          setFetchAllDue(false);
          break;
        case 'firstTimeDaily':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const lastLearnedDate = lastLearningDay ? new Date(lastLearningDay) : null;
          lastLearnedDate?.setHours(0, 0, 0, 0);

          
          
          const shouldFetch = !lastLearnedDate || today.getTime() !== lastLearnedDate.getTime();
          setFetchAllDue(shouldFetch);
          break;
        default:
          setFetchAllDue(false);
      }
    };
  
    setFetchAllDueBasedOnPreferences();
  }, [preferences, lastLearningDay]);

  const handleStartLearning = async () => {
    try {
      setDoneCards(0);
      setCardsAmount(0);

      if (preferences.fetch_all_due_mode !== 'always') {
        setFetchAllDue(false);
      }
      
      await dispatch(
        getLearningStackAction(germanCardsCount, russianCardsCount, fetchAllDue)
      );
      await resetDifficultyCounters();
    } catch (error) {
      console.log("Fehler beim Laden des Lernstapels");
    }
  };

  const resetDifficultyCounters = async () => {
    setEasyCount(0);
    setGoodCount(0);
    setMidCount(0);
    setHardCount(0);
  };

  const updateDifficultyCounter = (difficulty) => {
    if (difficulty === 1) setEasyCount((prev) => prev + 1);
    if (difficulty === 2) setGoodCount((prev) => prev + 1);
    if (difficulty === 3) setMidCount((prev) => prev + 1);
    if (difficulty === 4) setHardCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (learningStack && cardsAmount === 0 && learningStack.length > 0) {
      setCardsAmount(learningStack.length);
    }
  }, [learningStack, cardsAmount]);

  const handleCardUpdated = () => {
    setDoneCards((doneCards) => doneCards + 1);
  };

  useEffect(() => {
    if (!preferences) {
      dispatch(getPreferencesAction());
    } else {
      setGermanCardsCount(preferences.front_cards_count || 10);
      setRussianCardsCount(preferences.back_cards_count || 0);
    }
  }, [dispatch, preferences]);

  return (
    <div className="learning-stack-container">
      {learningStack && learningStack.length > 0 ? (
        <>
          <div className="learning-stack-metadata">
            <div className="learning-progress">
              {doneCards}/{cardsAmount}
            </div>
            <div className="difficulty-counter-container">
              <span className="difficulty-counter easy">{easyCount} </span>
              <span className="difficulty-counter good"> {goodCount} </span>
              <span className="difficulty-counter mid"> {midCount} </span>
              <span className="difficulty-counter hard">{hardCount} </span>
            </div>
          </div>
          <LearningCard
            card={learningStack[0]}
            onCardUpdated={handleCardUpdated}
            onUpdateDifficulty={updateDifficultyCounter}
          />
        </>
      ) : doneCards > 0 ? (
        <div className="fineshed-learning-stack-container">
          <div className="finished-header">
            Stapel erfolgreich Abgeschlossen
          </div>
          <div className="learning-progress">
            Karteikarten:{doneCards}/{cardsAmount}
          </div>

          <div className="difficulty-counter-container-fineshed">
            <span className="finished-difficulty-description">
              {" "}
              Leicht:
              <span className="difficulty-counter easy">{easyCount} </span>
            </span>
            <span className="finished-difficulty-description">
              {" "}
              Gut:<span className="difficulty-counter good">{goodCount} </span>
            </span>
            <span className="finished-difficulty-description">
              {" "}
              Mittel:
              <span className="difficulty-counter mid"> {midCount} </span>
            </span>
            <span className="finished-difficulty-description">
              {" "}
              Schwer:
              <span className="difficulty-counter hard">{hardCount} </span>
            </span>
          </div>

          <div className="start-learning-container">
            <div className="start-learning-input-container">
              <div className="cards-amount-input">
                <label htmlFor="fontAmount" className="input-label">
                  Deutsche Karten
                </label>
                <input
                  className="amount-input"
                  id="fontAmount"
                  type="number"
                  value={germanCardsCount}
                  onChange={(e) => setGermanCardsCount(Number(e.target.value))}
                  placeholder="Anzahl deutscher Karten"
                />
              </div>
              <div className="cards-amount-input">
                <label htmlFor="backAmount" className="input-label">
                  Russische Karten
                </label>
                <input
                  className="amount-input"
                  id="backAmout"
                  type="number"
                  value={russianCardsCount}
                  onChange={(e) => setRussianCardsCount(Number(e.target.value))}
                  placeholder="Anzahl russischer Karten"
                />
              </div>
              <div className="toggle-slider-container">
              <label className="toggle-slider">
                <input
                  type="checkbox"
                  checked={fetchAllDue}
                  onChange={(e) => setFetchAllDue(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
              <span className="slider-text">Alle fälligen Karten lernen</span>
            </div>
            </div>

            <button
              className="start-learing-button button"
              onClick={handleStartLearning}
            >
              Lernen beginnen
            </button>
          </div>
        </div>
      ) : (
        <div className="start-learning-container">
          <div className="start-learning-input-container">
            <div className="cards-amount-input">
              <label htmlFor="fontAmount" className="input-label">
                Deutsche Karten
              </label>
              <input
                className="amount-input"
                id="fontAmount"
                type="number"
                value={germanCardsCount}
                onChange={(e) => setGermanCardsCount(Number(e.target.value))}
                placeholder="Anzahl deutscher Karten"
              />
            </div>
            <div className="cards-amount-input">
              <label htmlFor="backAmount" className="input-label">
                Russische Karten
              </label>
              <input
                className="amount-input"
                id="backAmout"
                type="number"
                value={russianCardsCount}
                onChange={(e) => setRussianCardsCount(Number(e.target.value))}
                placeholder="Anzahl russischer Karten"
              />
            </div>
            <div className="toggle-slider-container">
              <label className="toggle-slider">
                <input
                  type="checkbox"
                  checked={fetchAllDue}
                  onChange={(e) => setFetchAllDue(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
              <span className="slider-text">Alle fälligen Karten lernen</span>
            </div>
          </div>

          <button
            className="start-learing-button button"
            onClick={handleStartLearning}
          >
            Lernen beginnen
          </button>
        </div>
      )}
    </div>
  );
}

export default LearningStack;
