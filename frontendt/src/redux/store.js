import {configureStore} from '@reduxjs/toolkit';
import flashMessageReducer from './slices/flashMessage';

const store = configureStore({
    reducer:{
        flashMessage: flashMessageReducer,
    }
})

export default store;