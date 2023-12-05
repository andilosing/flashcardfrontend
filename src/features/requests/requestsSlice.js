import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  newRequest: null,
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
      state.requests = state.requests.filter(request => request.request_id !== requestId);
    },

  },
});

export const { fetchRequests, addRequest, removeRequestBecauseOfResponse } = requestsSlice.actions;

export default requestsSlice.reducer;
