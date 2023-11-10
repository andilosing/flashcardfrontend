import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaHome,
  FaMoneyCheck,
  FaDollarSign,
  FaUser,
  FaApple,
  FaBars
} from "react-icons/fa";
import "./NavBar.css";
function NavBar({onNavClick, isActive }) {
  const menuItems = [
    { icon: <FaHome size="25px" />, title: "Lernen", link: "/" },
    {
      icon: <FaChartBar size="25px" />,
      title: "Karteikarten",
      link: "/add-card",
    },
    { icon: <FaHome size="25px" />, title: "Lernhistory", link: "/sessions" },
    { icon: <FaMoneyCheck size="25px" />, title: "tbd", link: "/" },
    { icon: <FaDollarSign size="25px" />, title: "tbd", link: "/" },
    { icon: <FaUser size="25px" />, title: "tbd", link: "/" },
  ];

  const defaultClickedIndex = menuItems.findIndex(
    (item) => item.title === "Dashboard"
  );
  const [clickedIndex, setClickedIndex] = useState(defaultClickedIndex);

  return (
    <nav className={`navigation-container ${isActive ? "active" : ""}`}>
      <div className="nav-header">
      <div className="logo">
        <span className="icon">
          <FaApple size="30px" />
        </span>
        <span className="title"> Logo</span>
      </div>
      <div className={"menu-bar"} onClick={() => {onNavClick()}}>
         <FaBars size="30px" />
        </div>
        </div>

      <ul>
        {menuItems.map(({ icon, title, link }, index) => (
          <Link to={link}>
            <li
              key={index}
              onClick={() => {
                setClickedIndex(index);
                onNavClick();
              }}
            >
              <div className={`nav-item ${clickedIndex === index ? "clicked" : ""}`}>
                <span className="icon">{icon}</span>
                <span className="title">{title}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="auth-buttons">
        <Link to="/login">
          <button className="nav-button">Anmelden</button>
        </Link>
        <Link to="/register">
          <button className="nav-button">Registrieren</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
