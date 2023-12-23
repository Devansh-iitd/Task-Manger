import { createSlice } from '@reduxjs/toolkit';

 const flashMessageSlice = createSlice({
    initialState : {
        message: '',
        isVisible: false,
    },
    name: 'flashMessage',
    reducers: {
        showMessage: (state, action) => {
            state.message = action.payload;
            state.isVisible = true;
        },
        hideMessage: (state) => { 
            state.isVisible = false;
        }
    }
});

export const { showMessage, hideMessage } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;
