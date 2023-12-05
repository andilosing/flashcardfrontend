import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  newRequest: null,
  notifications: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    fetchRequests: (state, action) => {
      state.requests = action.payload;
    },

    addRequest: (state, action) => {
      state.newRequest = action.payload;
      // state.requests = [...state.requests, state.newRequest];
    },
    removeRequestBecauseOfResponse: (state, action) => {
      const { requestId } = action.payload;
      state.requests = state.requests.filter(
        (request) => request.request_id !== requestId
      );
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    // Aktion zum Aktualisieren des Zeitpunkts, zu dem die Benachrichtigungen zuletzt angesehen wurden
    updateLastViewedAt: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  fetchRequests,
  addRequest,
  removeRequestBecauseOfResponse,
  updateLastViewedAt,
  setNotifications,
} = requestsSlice.actions;

export default requestsSlice.reducer;
