import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    decks: [],
    sharedDecks: {} // Speichert die Informationen über die geteilten Decks
}

const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        fetchDecks: (state, action) => {
            state.decks = action.payload;
        },
        updateDeckStatus: (state, action) => {
            const { deckId, isActive } = action.payload;
            const deckIndex = state.decks.findIndex(deck => deck.deck_id === deckId);
            if (deckIndex !== -1) {
                state.decks[deckIndex].is_active = isActive;
            }
        },
        storeDeckShares: (state, action) => {
            const { deckId, shares, openRequests } = action.payload;
        
            // Stellt sicher, dass das Objekt für das spezifische Deck existiert
            if (!state.sharedDecks[deckId]) {
                state.sharedDecks[deckId] = { shares: [], openRequests: [], eligibleUsers: [] };
            }
        
            // Aktualisiert shares und openRequests für das spezifische Deck
            state.sharedDecks[deckId].shares = shares || [];
            state.sharedDecks[deckId].openRequests = openRequests || [];
        
        },
        setEligibleUsersForShareDeck(state, action) {
            const { deckId, users } = action.payload;
      
            // Initialisiert das Objekt für das spezifische Deck, falls es nicht existiert
            if (!state.sharedDecks[deckId]) {
                state.sharedDecks[deckId] = { shares: [], openRequests: [] };
            }

            // Fügt eligibleUsers zum spezifischen Deck hinzu
            state.sharedDecks[deckId].eligibleUsers = users;
        },
        removeRequest: (state, action) => {
            
            const { deckId, requestId } = action.payload;
            if (state.sharedDecks[deckId]) {
              state.sharedDecks[deckId].openRequests = state.sharedDecks[deckId].openRequests.filter(request => request.request_id !== requestId);
            }
          },
          updateSharePermission: (state, action) => {
            const { shareId, deckId, newPermissionLevel } = action.payload;
            // Stellen Sie sicher, dass das Deck existiert
            if (state.sharedDecks[deckId]) {
                const shares = state.sharedDecks[deckId].shares;
                const shareIndex = shares.findIndex(share => share.share_id === shareId);

                if (shareIndex !== -1) {

                    shares[shareIndex].permission_level = newPermissionLevel;
                }
            }
        },
    }
})

export const { fetchDecks, updateDeckStatus, storeDeckShares, setEligibleUsersForShareDeck, removeRequest, updateSharePermission }  = decksSlice.actions
export default decksSlice.reducer
