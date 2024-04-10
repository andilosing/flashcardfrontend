import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hidePopup } from "../popupSlice";
import './Popup.css'; 

const Popup = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector((state) => state.popup);

  useEffect(() => {
    let timer;
    if (show && type === 'success') {
      timer = setTimeout(() => {
        dispatch(hidePopup());
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [show, type, dispatch]);

  if (!show) {
    return null;
  }

  let backgroundColor = '#444'; 
  if (type === 'error') {
    backgroundColor = '#ff3860'; 
  } else if (type === 'success') {
    backgroundColor = '#23d160'; 
  }

  return (
    <div className="popup-background">
      <div className="popup-container" style={{ backgroundColor }}>
        <h2>{type === 'error' ? 'Fehler' : 'Erfolg'}</h2>
        <p>{message}</p>
        {type === 'error' && (
          <button className="popup-button"onClick={() => dispatch(hidePopup())}>Schließen</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
