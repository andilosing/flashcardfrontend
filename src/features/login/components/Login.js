import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { loginUserAction } from "../loginAction";
import styles from "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (tokenInfo) {
      navigate("/"); 
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(loginUserAction(username, password));
      navigate("/")
    } catch (error) {
      console.log("Fehler beim einloggen");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <label className="input-label">Benutzername</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className=""
          />
        </div>
        <div className="input-container">
          <label className="input-label">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=""
          />
        </div>
        <div>
          <button type="submit" className="login-button button">
            Einloggen
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
