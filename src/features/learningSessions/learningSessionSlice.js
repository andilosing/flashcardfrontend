import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    learningSessionsList: [],
}

const learningSessionsSlice = createSlice({
    name: 'learningSessions',
    initialState,
    reducers: {
        fetchLearningSessions: (state, action) => {
            state.learningSessionsList = action.payload
        },
    }
})

export const { fetchLearningSessions }  = learningSessionsSlice.actions
export default learningSessionsSlice.reducer