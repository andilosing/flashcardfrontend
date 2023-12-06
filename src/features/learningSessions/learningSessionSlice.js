import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    learningSessionsList: [],
    otherUserLearningSessions: {}
}

const learningSessionsSlice = createSlice({
    name: 'learningSessions',
    initialState,
    reducers: {
        fetchLearningSessions: (state, action) => {
            state.learningSessionsList = action.payload
        },
        fetchLearningSessionsForOtherUser: (state, action) => {
            const { userId, sessions } = action.payload;
            state.otherUserLearningSessions[userId] = sessions;
          },
    }
})

export const { fetchLearningSessions, fetchLearningSessionsForOtherUser }  = learningSessionsSlice.actions
export default learningSessionsSlice.reducer