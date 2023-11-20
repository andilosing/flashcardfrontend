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
        updateDeckStatus: (state, action) => {
            const { deckId, isActive } = action.payload;
            const deckIndex = state.decks.findIndex(deck => deck.deck_id === deckId);
            if (deckIndex !== -1) {
                state.decks[deckIndex].is_active = isActive;
            }
            console.log(JSON.parse(JSON.stringify(state.decks)));
        },
    }
})

export const { fetchDecks, updateDeckStatus }  = decksSlice.actions
export default decksSlice.reducer