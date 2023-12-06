import React from "react";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import "./TopBar.css";

function TopBar({ isActive, onNavBarClick }) {
  const loggedInUser = useSelector((state) => state.users.user);

  const getInitials = (username) => {
    return username ? username.substring(0, 2).toUpperCase() : '';
  }

  return (
    <section className={`topbar ${isActive ? "active" : ""}`}>
      <div className={"menu-bar"} onClick={onNavBarClick}>
        <FaBars size="30px" />
      </div>
      {loggedInUser && loggedInUser.username && 
        <div className="user">{getInitials(loggedInUser.username)}</div>}
    </section>
  );
}

export default TopBar;
