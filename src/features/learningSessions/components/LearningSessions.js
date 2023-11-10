import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLearningSessionsAction } from "../learningSessionsAction"
import styles from "./LearningSessions.css";

function LearningSessions() {
  const dispatch = useDispatch();
  const learningSessions = useSelector((state) => state.learningSessions.learningSessionsList);
  const [structuredSessions, setStructuredSessions] = useState({});
  
  
  useEffect(() => {
    try {
        dispatch(getLearningSessionsAction());
      } catch (error) {
        console.log("Fehler beim Laden des Lernstapels");
      }
    
  }, [dispatch]);

  useEffect(() => {
    const sessionsByYearAndMonth = learningSessions.reduce((acc, session) => {
      const date = new Date(session.session_date);
      const year = date.getFullYear();
      const month = date.toLocaleString('de-DE', { month: 'long' });
      const day = date.getDate();
  
      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
  
      acc[year][month].push({
        date: `${day}.`, // Füge einen Punkt nach dem Tag hinzu
        time: session.total_learning_time_minutes,
        cards: session.total_cards_learned
      });
    
      return acc;
    }, {});
  
    setStructuredSessions(sessionsByYearAndMonth);
  }, [learningSessions]);
 
 
  const renderSessions = () => {
    const sortedYears = Object.keys(structuredSessions).sort((a, b) => b - a);

    return sortedYears.map((year) => (
      <div key={year} className="sessions-year-data-container">
        <h2 className="sessions-year-header">{year}</h2>
        {Object.keys(structuredSessions[year]).map((month) => (
          <div key={month}>
            <h3 className="sessions-month-header">{month}</h3>
            {structuredSessions[year][month].map((session, index) => (
              <div key={index}>
                <div className="sessions-data">{session.date}: {session.time} Minuten | Karten: {session.cards}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="learning-sessions-container">
      {learningSessions && learningSessions.length > 0 ? renderSessions() : <p>Keine Lernsessions gefunden.</p>}
    </div>
  );

}

export default LearningSessions;
