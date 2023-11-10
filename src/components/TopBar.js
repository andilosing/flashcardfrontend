import React, { useState } from "react";
import {
   FaBars
  } from "react-icons/fa";
import "./TopBar.css"

function TopBar({isActive, onNavBarClick }) {
   
    return (
      <section className={`topbar ${isActive ? "active" : ""}`}>
        <div className={"menu-bar"} onClick={onNavBarClick}>
         <FaBars size="30px" />
        </div>
        <div className="user">AL</div>

        
      </section>
    );
  }
  
  export default TopBar;