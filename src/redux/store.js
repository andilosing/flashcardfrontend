import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import learningStackReducer from "../features/learningStack/learningStackSlice"
import cardsReducer from "../features/cards/cardsSlice"
import learningSessionsReducer from "../features/learningSessions/learningSessionSlice"
import decksReducer from "../features/decks/decksSlice"
import requestsReducer from "../features/requests/requestsSlice"

const combinedReducer = combineReducers({
    learningStack: learningStackReducer,
    cards: cardsReducer,
    learningSessions: learningSessionsReducer,
    decks: decksReducer,
    requests: requestsReducer
});

const store = configureStore({
  reducer: combinedReducer,
});


export default store;
