import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import learningStackReducer from "../features/learningStack/learningStackSlice"
import cardsReducer from "../features/cards/cardsSlice"
import learningSessionsReducer from "../features/learningSessions/learningSessionSlice"

const combinedReducer = combineReducers({
    learningStack: learningStackReducer,
    cards: cardsReducer,
    learningSessions: learningSessionsReducer
    

});

const store = configureStore({
  reducer: combinedReducer,

  
});


export default store;
