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
        loginUser: (state, action) => {
            state.user = action.payload.user;
        },
        logoutUser: (state) => {
            state.user = null;
        },
      
    }
});

export const { storeAllUsers, loginUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
