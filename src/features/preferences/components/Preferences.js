import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPreferencesAction,
  updatePreferencesAction,
  resetPreferencesAction,
} from "../preferencesAction";
import { FaSave, FaUndo } from "react-icons/fa";
import styles from "./Preferences.css";
import { showPopup } from "../../popup/popupSlice";

function Preferences() {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.preferences);
  const [localPreferences, setLocalPreferences] = useState({});

  useEffect(() => {
    if (Object.keys(preferences || {}).length) {
      setLocalPreferences(preferences);
    } else {
      dispatch(getPreferencesAction());
    }
  }, [preferences, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalPreferences((prev) => ({
      ...prev,
      [name]: name === "fetch_all_due_mode" ? value : parseInt(value, 10),
    }));
  };

  const handleSavePreferences = async () => {
    try{
      await dispatch(updatePreferencesAction(localPreferences));
      dispatch(showPopup({ message: `Einstellungen erfolgreich gespeichert`, type: 'success' }));
    } catch(error){
      console.log(error)
    }
    

  };

  const handleResetPreferences = async () => {
    try {
      await dispatch(resetPreferencesAction());
    dispatch(showPopup({ message: `Einstellungen erfolgreich zurückgesetzt`, type: 'success' }));
    } catch (error) {
      console.log(error)
    }
    
  };

  // Füge fetch_all_due_mode den textPreferences hinzu, um zu verdeutlichen, dass es eine separate Logik benötigt
  const textPreferences = [];
  const radioPreferences = ["fetch_all_due_mode"];

  const preferenceLabels = {
    front_cards_count: "Deutsche Karten",
    back_cards_count: "Russische Karten",
    average_learning_time_good: "Gute ⌀ Lernzeit",
    average_learning_time_bad: "Schlechte ⌀ Lernzeit",
    learning_streak_good: "Gute Lernstreak ",
    learning_streak_bad: "Schlechte Lernstreak",
    fetch_all_due_mode: "Alle fälligen Karten",
  };

  const groups = {
    cardCounts: {
      label: "Lernen",
      keys: ["front_cards_count", "back_cards_count", "fetch_all_due_mode"],
    },
    learningTimes: {
      label: "⌀ Lernzeit (min)",
      keys: [
        "average_learning_time_good",
        "average_learning_time_bad",
      ],
    },
    learningStreaks: {
      label: "Lernstreak (Tage)",
      keys: [
        "learning_streak_good",
        "learning_streak_bad",
      ],
    },
  };

  const fetchAllDueModeOptions = {
    never: "Nie",
    firstTimeDaily: "1x/Tag",
    always: "Immer",
  };

  
  return (
    <div className="preferences-container">
      <h3 className="preferences-header">Einstellungen</h3>
      {Object.entries(groups).map(([groupKey, { label, keys }]) => (
        <div key={groupKey} className="preferences-group">
          <h4 className="preferences-group-header">{label}</h4>
          {keys.map((key) => (
            <div key={key} className="preference-item">
              <label className="preference-label">
                {preferenceLabels[key]}
              </label>
              {radioPreferences.includes(key) ? (
                <div className="radio-options-container">
                  {Object.entries(fetchAllDueModeOptions).map(
                    ([optionValue, optionLabel]) => (
                      <div className="radio-option" key={optionValue}>
                        <input
                          type="radio"
                          id={`${key}-${optionValue}`}
                          name={key}
                          value={optionValue}
                          checked={localPreferences[key] === optionValue}
                          onChange={handleInputChange}
                        />
                        <label htmlFor={`${key}-${optionValue}`}>
                          {optionLabel}
                        </label>{" "}
                       
                      </div>
                    )
                  )}
                </div>
              ) : (
                <input
                  type={textPreferences.includes(key) ? "text" : "number"}
                  className="preference-input"
                  name={key}
                  value={
                    localPreferences[key] !== undefined
                      ? localPreferences[key]
                      : ""
                  }
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <div className="preferences-actions">
      <button onClick={handleResetPreferences} className="reset-button button">
          <FaUndo className="icon-button"/> Zurücksetzen
        </button>
        <button onClick={handleSavePreferences} className="save-button button">
          <FaSave className="icon-button"/> Speichern
        </button>
      </div>
    </div>
  );
}

export default Preferences;
