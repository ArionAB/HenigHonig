import { createSlice } from '@reduxjs/toolkit';
import { Tables } from '../Models/Database';

const initialState: any = {
    currentUser: {} as Tables<'profiles'>
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setProfileToUser: (state, action) => {
            console.log('aciton', action.payload)
            state.currentUser.profile = action.payload
        }
    },
});

export const { setCurrentUser, setProfileToUser } = authSlice.actions;

export default authSlice.reducer;