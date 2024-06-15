import { createSlice } from '@reduxjs/toolkit';
import { CartModel } from '../Models/Cart/CartModel';
import { Tables } from '../Models/Database';
import { CartItemsModel } from '../Models/Cart/CartItemsModel';

const initialState: any = {
    cartItems: [] as CartItemsModel[]

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },

    },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;