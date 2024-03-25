import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user: null, 
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        storeAllUsers: (state, action) => {
            state.users = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
        updateLastLearningDay: (state, action) => {
            if (state.user) {
                state.user.lastLearningDay = action.payload;
            }
        },
        updateLearningStreak: (state, action) => {
            if (state.user) {
                if (action.payload === 'increment') {
                    state.user.learnignStreakInDays += 1;
                } else {
                    state.user.learnignStreakInDays = action.payload;
                }
            }
        },
      
    }
});

export const { storeAllUsers, saveUser, logoutUser, updateLastLearningDay, updateLearningStreak } = usersSlice.actions;
export default usersSlice.reducer;
