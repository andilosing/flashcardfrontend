import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    decks: [],
}

const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        fetchDecks: (state, action) => {
            state.decks = action.payload
        },
    }
})

export const { fetchDecks }  = decksSlice.actions
export default decksSlice.reducer