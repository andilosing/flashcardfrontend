import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import AddCard from "./features/cards/components/AddCard";
import LearningStack from "./features/learningStack/components/LearningStack";
import LearningSessions from "./features/learningSessions/components/LearningSessions"

function App() {
  const location = useLocation();
  const [isNavActive, setIsNavActive] = useState(false);

  useEffect(() => {
  }, [location]);

  return (
    <div className="body-container">
      <NavBar isActive={isNavActive} onNavClick={() => setIsNavActive(false)}/>
      

      <section className="main">
      {isNavActive && (
        <div className="overlay" onClick={() => setIsNavActive(false)}></div>
      )}
      <TopBar isActive={isNavActive} onNavBarClick={() => setIsNavActive(!isNavActive)} />
      <section className="main-content">
        <Routes>
          <Route path="/" element={<LearningStack />} />
          <Route path="/add-card" element={<AddCard />} />
          <Route path="/sessions" element={<LearningSessions />} />
        </Routes>
        </section>
      </section>
    </div>
  );
}

export default App;
