import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDecksAction } from "../decksAction"; 
import styles from "./Decks.css";

function Decks() {
  const decks = useSelector((state) => state.decks.decks)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (decks.length === 0) {
      const fetchData = async () => {
        try {
          await dispatch(getDecksAction());
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [dispatch, decks.length]); 

  const handleDeckClick = (deck_id) => {
    navigate(`/decks/${deck_id}`);
  };

  return (
    <div className="decks-container">
      <h3 className="decks-header">Kateikartendecks</h3>
      <ul className="decks-list">
        {decks.map((deck) => (
          <li key={deck.deck_id} className="decks-list-item" onClick={() => handleDeckClick(deck.deck_id)}>
            <div className="deck-name">{deck.name}</div>
            <div className="deck-card-count">Anzahl Karteikarten: {deck.card_count}</div>
            <div className="deck-created-at">Erstellt am: {deck.created_at}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Decks;
