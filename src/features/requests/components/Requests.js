import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestsAction,
  handleRequestResponseAction,
  fetchNotificationsForUserAction,
  updateLastViewedAtForUserAction
} from "../requestsAction";
import styles from "./Requests.css";
import { FaCheck, FaTimes, FaUser, FaIdCard, FaStopwatch } from "react-icons/fa";

function Requests() {
  const requests = useSelector((state) => state.requests.requests);
  const notifications = useSelector((state) => state.requests.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestsAction());
    dispatch(fetchNotificationsForUserAction());

    return () => {
      if(notifications && notifications.length > 0){
      dispatch(updateLastViewedAtForUserAction());
      }
    };
  }, [dispatch]);
  


  const handleAccept = (requestId) => {
    let action = "accept";
    dispatch(handleRequestResponseAction(requestId, action));
  };

  const handleReject = (requestId) => {
    let action = "decline";
    dispatch(handleRequestResponseAction(requestId, action));
  };

  return (
    <div className="requests-container">
      <h3 className="sessions-header">Mitteilungen</h3>

      {(!notifications || notifications.length === 0) && (!requests || requests.length === 0) && 
      <p>Keine neuen Mitteilungen</p>
      }

      {notifications && notifications.length > 0 && (
        <>
          <h4 className="sessions-year-header">Benachrichtigungen</h4>
          <ul className="notifications-list">
            {/* Hier können Sie Benachrichtigungen rendern */}
            {notifications.map((notification, index) => (
              <li key={index} className="sessions-data">
                <p className="sessions-data-item first">    <FaUser /> {notification.username} </p> 
                <p className="sessions-data-item first"> {notification.total_learning_time_minutes} min<FaStopwatch /></p>
                <p className="sessions-data-item first"> {notification.total_cards_learned} <FaIdCard /></p>
              </li>
            ))}
          </ul>
        </>
      )}

      {requests && requests.length > 0 && (
        <>
          <h4 className="sessions-year-header">Anfragen</h4>
          <ul className="requests-list">
            {requests.map((request, index) => (
              <li key={index} className="sessions-data">
                <div className="request-details">
                  <p>
                    {request.sender_username} möchte mit dir das Deck{" "}
                    {request.deck_name} teilen
                  </p>
                </div>
                <div className="request-actions">
                  <div
                    className="request-accept-button button"
                    onClick={() => handleAccept(request.request_id)}
                  >
                    <FaCheck />
                  </div>
                  <div
                    className="request-reject-button button"
                    onClick={() => handleReject(request.request_id)}
                  >
                    <FaTimes />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Requests;
