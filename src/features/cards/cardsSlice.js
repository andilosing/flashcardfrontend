import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: [],
    newCard: null
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetchCards: (state, action) => {
            state.cards = action.payload
        },
        addNewCard: (state, action) => {
            state.cards = [...state.cards, action.payload]
        }
    }
})

export const { fetchCards, addNewCard }  = cardsSlice.actions
export default cardsSlice.reducer