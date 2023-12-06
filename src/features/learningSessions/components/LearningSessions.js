import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLearningSessionsAction,
  getLearningSessionsForOtherUserAction,
} from "../learningSessionsAction";
import styles from "./LearningSessions.css";
import { FaCalendar, FaStopwatch, FaIdCard } from "react-icons/fa";
import { getAllUsersAction } from "../../users/usersAction";

function LearningSessions() {
  const dispatch = useDispatch();
  const learningSessions = useSelector(
    (state) => state.learningSessions.learningSessionsList
  );
  const otherUserSessions = useSelector(
    (state) => state.learningSessions.otherUserLearningSessions
  );
  const users = useSelector((state) => state.users.users);
  const [structuredSessions, setStructuredSessions] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUsersAction());
        await dispatch(getLearningSessionsAction());
      } catch (error) {
        console.log("Fehler beim Laden des Lernstapels:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchOtherSessins = async () => {
      await dispatch(getLearningSessionsForOtherUserAction(selectedUserId));
    };
    if (selectedUserId && !(selectedUserId in otherUserSessions)) {
      fetchOtherSessins();
    }
  }, [selectedUserId, dispatch, otherUserSessions]);

  useEffect(() => {
    const sessions =
      selectedUserId && selectedUserId in otherUserSessions
        ? otherUserSessions[selectedUserId]
        : learningSessions;

    if (!sessions || sessions.length === 0) {
      setStructuredSessions({});
      return;
    }

    const sessionsByYearAndMonth = sessions.reduce((acc, session) => {
      const date = new Date(session.session_date);
      const year = date.getFullYear();
      const month = date.toLocaleString("de-DE", { month: "long" });
      const day = date.getDate();
      const weekDay = date.toLocaleString("de-DE", { weekday: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push({
        date: `${day}. ${weekDay} `,
        time: session.total_learning_time_minutes,
        cards: session.total_cards_learned,
      });

      return acc;
    }, {});

    setStructuredSessions(sessionsByYearAndMonth);
  }, [learningSessions, otherUserSessions, selectedUserId]);

  const sessionsToRender =
    selectedUserId && selectedUserId in otherUserSessions
      ? otherUserSessions[selectedUserId]
      : learningSessions;

  const renderSessions = () => {
    const sortedYears = Object.keys(structuredSessions).sort((a, b) => b - a);

    return sortedYears.map((year) => (
      <div key={year} className="sessions-year-data-container">
        <h2 className="sessions-year-header">{year}</h2>
        {Object.keys(structuredSessions[year] || {}).map((month) => (
          <div key={month}>
            <h3 className="sessions-month-header">{month}</h3>
            {structuredSessions[year][month].map((session, index) => (
              <div key={index}>
                <div className="sessions-data">
                  <div className="sessions-data-item first">
                    <FaCalendar /> <span>{session.date}</span>
                  </div>
                  <div className="sessions-data-item mid">
                    <span>{session.time} min</span> <FaStopwatch />
                  </div>
                  <div className="sessions-data-item last">
                    <span>{session.cards}</span> <FaIdCard />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="learning-sessions-container">
      <h3 className="sessions-header">Lernhistory</h3>
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
        className="share-deck-form input learningSessions"
      >
        <option value="">Ich</option>
        {users.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.username}
          </option>
        ))}
      </select>
      <div className="sessions-list-container">
        {sessionsToRender && sessionsToRender.length > 0 ? (
          renderSessions()
        ) : (
          <p>Keine Lernsessions gefunden.</p>
        )}
      </div>
    </div>
  );
}

export default LearningSessions;
