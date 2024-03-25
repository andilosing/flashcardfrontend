import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferences: {},
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      // Aktualisiere alle Präferenzen mit den Werten aus der Aktion
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const {
  setPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
