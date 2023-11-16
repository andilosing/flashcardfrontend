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
            state.decks[deckId] = [...state.decks[deckId]].sort((a, b) => a.card_id - b.card_id);
        },
        addCardToDeck: (state, action) => {
            const { deckId, card } = action.payload;
            if (state.decks[deckId]) {
                state.decks[deckId].push(card);
            } else {
                // Handle the case where the deck does not exist yet
                //state.decks[deckId] = [card];
            }
        },
        updateCardInDeck: (state, action) => {
           
            // const { deckId, cardId, updatedCard } = action.payload;
         
            // if (state.decks[deckId]) {
            //     console.log("ich 3")
            //     console.log(state.decks[deckId])
            //     const cardIndex = state.decks[deckId].findIndex(card => card.card_id === cardId);
            //     console.log(cardIndex)
            //     if (cardIndex !== -1) {
            //         console.log("ich 4")
            //         state.decks[deckId][cardIndex] = { ...state.decks[deckId][cardIndex], ...updatedCard };
            //         state.decks[deckId] = [...state.decks[deckId]].sort((a, b) => a.card_id - b.card_id);
            //         console.log("1")
            //     }
            // }
        },
    }
})

export const { fetchCardsForDeck, addCardToDeck, updateCardInDeck }  = cardsSlice.actions
export default cardsSlice.reducer