import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    decks: {},
    newCard: null
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetchCardsForDeck: (state, action) => {
            const { deckId, cards } = action.payload;
            state.decks[deckId] = cards;
        },
        addCardToDeck: (state, action) => {
            const { deckId, card } = action.payload;
            if (state.decks[deckId]) {
                state.decks[deckId].push(card);
            } else {
                // Handle the case where the deck does not exist yet
                state.decks[deckId] = [card];
            }
        },
    }
})

export const { fetchCardsForDeck, addCardToDeck }  = cardsSlice.actions
export default cardsSlice.reducer