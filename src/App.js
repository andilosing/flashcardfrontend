import "./App.css";
import React, { useEffect, useState } from "react";
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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavActive, setIsNavActive] = useState(false);

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
            <Route path="/decks/:deck_id" element={<AddCard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </section>
    </div>
  );
}

export default App;
