import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    learningStack: [],
}

const learningStackSlice = createSlice({
    name: 'learningStack',
    initialState,
    reducers: {
        fetchLearningStack: (state, action) => {
            state.learningStack = action.payload
        },
        updatedLearningCard: (state, action) => {
            const updatedCardId = action.payload;
            state.learningStack = state.learningStack.filter(card => card.progress_id !== updatedCardId);
        }
    }
})

export const { fetchLearningStack, updatedLearningCard }  = learningStackSlice.actions
export default learningStackSlice.reducer