import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestsAction,
  handleRequestResponseAction,
} from "../requestsAction";
import styles from "./Requests.css";
import { FaCheck, FaTimes } from "react-icons/fa";

function Requests() {
  const requests = useSelector((state) => state.requests.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Requests loaded in component");
    dispatch(fetchRequestsAction());
  }, [dispatch]);

  const handleAccept = (requestId) => {
    let action = "accept"
    dispatch(handleRequestResponseAction(requestId, action));
  };

  const handleReject = (requestId) => {
    let action = "decline"
    dispatch(handleRequestResponseAction(requestId, action));
  };

  return (
    <div className="requests-container">
      <h3 className="requests-header">Anfragen</h3>
      <ul className="requests-list">
        {requests.length === 0 ? (
          <p>Keine neuen Anfragen</p>
        ) : (
          requests.map((request, index) => (
            <li key={index} className="request-item">
              <div className="request-details">
                <p>
                  {request.sender_username} möchte mit dir das Deck
                  {request.deck_name} teilen
                </p>
              </div>
              <div className="request-actions">
                <div className="request-accept-button button"
                 onClick={() => handleAccept(request.request_id)}>
                <FaCheck />
                </div>
                <div className="request-reject-button button"
                onClick={() => handleReject(request.request_id)}>
                <FaTimes />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Requests;
