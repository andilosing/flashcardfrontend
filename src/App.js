import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import AddCard from "./features/cards/components/AddCard";
import LearningStack from "./features/learningStack/components/LearningStack";
import LearningSessions from "./features/learningSessions/components/LearningSessions";
import Login from "./features/login/components/Login";
import Decks from "./features/decks/components/Decks"
import Deck from "./features/decks/components/Deck"
import AddDeck from "./features/decks/components/AddDeck";
import Requests from "./features/requests/components/Requests";
import ShareDeck from "./features/decks/components/ShareDeck";

import { fetchRequestsAction, fetchNotificationsForUserAction } from "./features/requests/requestsAction"
import { getLoggedInUserAction } from "./features/users/usersAction";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isNavActive, setIsNavActive] = useState(false);
  const loggedInUser = useSelector((state) => state.users.user);

  useEffect(() => {
    if (location.pathname === "/login") {
      return;
    }

    const tokenInfoString = localStorage.getItem("tokenInfo");
    if (tokenInfoString) {
      const tokenInfo = JSON.parse(tokenInfoString);
      const expiresAt = new Date(tokenInfo.expires_at);
      const now = new Date();

      if (now > expiresAt) {
        localStorage.removeItem("tokenInfo");
        window.location.reload();
      }
    } else {
      navigate("/login");
    }
  }, [navigate, location]);

  useEffect(() => {
    const tokenInfoString = localStorage.getItem("tokenInfo");
    if (!tokenInfoString) {
      return;
    }
    if(!loggedInUser){
      dispatch(getLoggedInUserAction())
    }
  
    dispatch(fetchRequestsAction());
    dispatch(fetchNotificationsForUserAction());
  
    const notificationInterval = setInterval(() => {
      dispatch(fetchRequestsAction());
      dispatch(fetchNotificationsForUserAction());
    }, 3600000); 
  
    return () => clearInterval(notificationInterval);
  }, [dispatch]);
  

  return (
    <div className="body-container">
      <NavBar isActive={isNavActive} onNavClick={() => setIsNavActive(false)} />

      <section className="main">
        {isNavActive && (
          <div className="overlay" onClick={() => setIsNavActive(false)}></div>
        )}
        <TopBar
          isActive={isNavActive}
          onNavBarClick={() => setIsNavActive(!isNavActive)}
        />
        <section className="main-content">
          <Routes>
            <Route path="/" element={<LearningStack />} />
            <Route path="/sessions" element={<LearningSessions />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/decks/add" element={<AddDeck />} />
            <Route path="/decks/:deck_id" element={<Deck />} />
            <Route path="/decks/share-deck/:deck_id" element={<ShareDeck /> } /> 
            <Route path="/decks/:deck_id/addCard" element={<AddCard />} />
            <Route path="/decks/:deck_id/addCard/:card_id" element={<AddCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/requests" element={<Requests />} />
            

          </Routes>
        </section>
      </section>
    </div>
  );
}

export default App;
