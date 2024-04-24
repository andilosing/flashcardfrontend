import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  FaSchool,
  FaMedal,
  FaDollarSign,
  FaStickyNote,
  FaBtc,
  FaBars,
  FaBell,
  FaSlidersH
} from "react-icons/fa";
import "./NavBar.css";
function NavBar({onNavClick, isActive }) {

  const location = useLocation();
  const requests = useSelector((state) => state.requests.requests);
  const notifications = useSelector((state) => state.requests.notifications)
  const requestsCount = requests.length + notifications.length;


  const menuItems = [
    { icon: <FaSchool size="25px" />, title: "Lernen", link: "/" },
    { icon: <FaStickyNote size="25px" />, title: "Decks", link: "/decks"},
    { icon: <FaMedal size="25px" />, title: "Lernhistory", link: "/sessions" },
    { icon: <FaBell size="25px" />, title: "Mitteilungen", link: "/requests", notifications: requestsCount },
    { icon: <FaSlidersH size="25px" />, title: "Einstellungen", link: "/preferences"}
  ];

  const [btcPrice, setBtcPrice] = useState('');
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

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        if (!response.ok) {  
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const newPrice = data.bitcoin.usd;
        
        setBtcPrice(`$${newPrice.toLocaleString()}`);
        
      } catch (error) {
        console.error('Failed to fetch Bitcoin price:', error);
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 3600000); 
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tokenInfo');
    window.location.reload(); 
  }

  const isActiveLink = (link) => {
    if (link === "/") {
      return location.pathname === link;
    }
    return location.pathname.startsWith(link);
  };

  return (
    <nav className={`navigation-container ${isActive ? "active" : ""}`}>
      <div className="nav-header">
      <div className="logo">
        <span className="icon">
          <FaBtc size="30px" />
          <span className={`btc-price`}>{btcPrice}</span>
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
                onNavClick();
              }}
            >
              
              <div className={`nav-item ${isActiveLink(link) ? "clicked" : ""}`}>
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
