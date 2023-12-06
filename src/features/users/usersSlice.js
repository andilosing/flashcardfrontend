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
      
    }
});

export const { storeAllUsers, saveUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
