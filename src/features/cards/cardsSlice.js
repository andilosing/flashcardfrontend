import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  decks: {},
  newCard: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCardsForDeck: (state, action) => {
      const { deckId, cards } = action.payload;
      state.decks[deckId] = cards;
      state.decks[deckId] = [...state.decks[deckId]].sort(
        (a, b) => a.card_id - b.card_id
      );
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
      const { deckId, cardId, updatedCard } = action.payload;

      if (state.decks[deckId]) {
        // Konvertieren von cardId in Number, wenn card.card_id eine Zahl ist
        const numericCardId = Number(cardId);
        const cardIndex = state.decks[deckId].findIndex(
          (card) => card.card_id === numericCardId
        );

        if (cardIndex !== -1) {
          state.decks[deckId][cardIndex] = {
            ...state.decks[deckId][cardIndex],
            ...updatedCard,
          };
          // Sortieren, wenn notwendig
          state.decks[deckId] = [...state.decks[deckId]].sort(
            (a, b) => a.card_id - b.card_id
          );
        }
      }
    },

    removeCardsFromDeck: (state, action) => {
      const { deckId, cardIds } = action.payload;
      //    console.log(JSON.parse(JSON.stringify(state.decks)));
      //     console.log(JSON.parse(JSON.stringify(state.decks[deckId])));

      if (state.decks[deckId]) {
        state.decks[deckId] = state.decks[deckId].filter(
          (card) => !cardIds.includes(card.card_id)
        );
      }
    },
    updateLearningStackStatus: (state, action) => {
      const cardIdsInLearningStack = action.payload;
      Object.keys(state.decks).forEach((deckId) => {
        state.decks[deckId].forEach((card) => {
          if (cardIdsInLearningStack.includes(card.card_id)) {
            card.in_learning_stack = true;
          }
        });
      });
    },
  },
});

export const {
  fetchCardsForDeck,
  addCardToDeck,
  updateCardInDeck,
  removeCardsFromDeck,
  updateLearningStackStatus,
} = cardsSlice.actions;
export default cardsSlice.reducer;
