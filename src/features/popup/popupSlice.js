import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  show: false, 
  message: '', 
  type: '' 
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {

    showPopup: (state, action) => {
      const { message, type } = action.payload;
      state.show = true;
      state.message = message;
      state.type = type;
    },
    
    hidePopup: (state) => {
      state.show = false;
      state.message = '';
      state.type = '';
    },
  }
});


export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
