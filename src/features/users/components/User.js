import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "../usersAction"; 
import { FaSave } from "react-icons/fa";
import styles from "./User.css"; 

function User() {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Die neuen Passwörter stimmen nicht überein");
      return;
    }
    await dispatch(changePasswordAction(passwords.oldPassword, passwords.newPassword));
  };

  return (
    <div className="preferences-container">
      <h3 className="preferences-header">Profil</h3>
  
      <form id="passwordForm" onSubmit={handleSubmit} className="preferences-group">
        <h4 className="preferences-group-header">Passwort ändern</h4>
  
        <div className="preference-item">
          <label className="preference-label">Altes Passwort</label>
          <input
            type="password"
            name="oldPassword"
            className="preference-input"
            value={passwords.oldPassword}
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className="preference-item">
          <label className="preference-label">Neues Passwort</label>
          <input
            type="password"
            name="newPassword"
            className="preference-input"
            value={passwords.newPassword}
            onChange={handleChangePassword}
            required
          />
        </div>
        <div className="preference-item">
          <label className="preference-label">Neues Passwort bestätigen</label>
          <input
            type="password"
            name="confirmPassword"
            className="preference-input"
            value={passwords.confirmPassword}
            onChange={handleChangePassword}
            required
          />
        </div>
  
        <div className="user-actions">
          <button type="submit" className="save-button button">
            <FaSave className="icon-button"/>  Aktualisieren
          </button>
        </div>
      </form>
    </div>
  );
}

export default User;
