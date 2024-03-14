import React from "react";
import { useSelector } from "react-redux";
import { FaBars, FaClock, FaFire } from "react-icons/fa";
import "./TopBar.css";

function TopBar({ isActive, onNavBarClick }) {
  const loggedInUser = useSelector((state) => state.users.user);

  const getInitials = (username) => {
    return username ? username.substring(0, 2).toUpperCase() : "";
  };

  const getLearningTimeColor = (minutes) => {
    if (minutes < 30) return "salmon";
    if (minutes > 60) return "lightgreen";
    return "khaki";
  };

  const getStreakColor = (days) => {
    if (days < 15) return "salmon";
    if (days > 30) return "khaki";
    return "lightgreen";
  };

  return (
    <section className={`topbar ${isActive ? "active" : ""}`}>
      <div className={"menu-bar"} onClick={onNavBarClick}>
        <FaBars size="30px" />
      </div>
      <div className="topbar-info">
        {loggedInUser &&
          loggedInUser.averageLearningTimePerDayMin !== undefined && (
            <div className="learning-info">
              <FaClock
                size="25px"
                color={getLearningTimeColor(
                  loggedInUser.averageLearningTimePerDayMin
                )}
              />
              <span>{loggedInUser.averageLearningTimePerDayMin} min</span>
            </div>
          )}

        {loggedInUser && loggedInUser.learnignStreakInDays !== undefined && (
          <div className="streak-info">
            <FaFire
              size="25px"
              color={getStreakColor(loggedInUser.learnignStreakInDays)}
            />
            <span>{loggedInUser.learnignStreakInDays} Tage</span>
          </div>
        )}
      </div>
      {loggedInUser && loggedInUser.username && (
        <div className="user">{getInitials(loggedInUser.username)}</div>
      )}
    </section>
  );
}

export default TopBar;
