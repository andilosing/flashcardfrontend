import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaSchool,
  FaMedal,
  FaDollarSign,
  FaStickyNote,
  FaBtc,
  FaBars,
  FaBell
} from "react-icons/fa";
import "./NavBar.css";
function NavBar({onNavClick, isActive }) {

  const requests = useSelector((state) => state.requests.requests);
  const notifications = useSelector((state) => state.requests.notifications)
  const requestsCount = requests.length + notifications.length;


  const menuItems = [
    { icon: <FaSchool size="25px" />, title: "Lernen", link: "/" },
    { icon: <FaStickyNote size="25px" />, title: "Decks", link: "/decks"},
    { icon: <FaMedal size="25px" />, title: "Lernhistory", link: "/sessions" },
    { icon: <FaBell size="25px" />, title: "Mitteilungen", link: "/requests", notifications: requestsCount },

  ];


  const defaultClickedIndex = menuItems.findIndex(
    (item) => item.title === "Dashboard"
  );

  const [clickedIndex, setClickedIndex] = useState(defaultClickedIndex);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenInfo = localStorage.getItem('tokenInfo');
    setIsLoggedIn(!!tokenInfo);

    const handleLoginStatusChange = () => {
      const tokenInfo = localStorage.getItem('tokenInfo');
      setIsLoggedIn(!!tokenInfo);
    };

    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tokenInfo');
    window.location.reload(); 
  }

  return (
    <nav className={`navigation-container ${isActive ? "active" : ""}`}>
      <div className="nav-header">
      <div className="logo">
        <span className="icon">
          <FaBtc size="30px" />
        </span>
        <span className="title"></span>
      </div>
      <div className={"menu-bar"} onClick={() => {onNavClick()}}>
         <FaBars size="30px" />
        </div>
        </div>

      <ul>
        {menuItems.map(({ icon, title, link, notifications } , index) => (
          <Link key={index} to={link}>
            <li
              className="nav-li-item"
              key={index}
              onClick={() => {
                setClickedIndex(index);
                onNavClick();
              }}
            >
              <div className={`nav-item ${clickedIndex === index ? "clicked" : ""}`}>
                <span className="icon">{icon}
                {notifications > 0 && 
                  <span className="notification-badge">{notifications}</span>
                }
                </span>
                
                <span className="title">{title}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <Link to="/logout">
            <button className="nav-button" onClick={handleLogout}>Ausloggen</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="nav-button">Anmelden</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
