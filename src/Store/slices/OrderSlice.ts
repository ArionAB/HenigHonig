import { createSlice } from '@reduxjs/toolkit';
import { Tables, TablesInsert } from '../Models/Database';
import { OrderModel } from '../Models/Order/OrderModel';

const initialState: any = {
    orderProducts: [] as TablesInsert<'orders_address'>[],
    orderAddress: {} as Tables<'orders_address'>,
    userOrders: [] as OrderModel[]
};

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderProducts: (state, action) => {
            state.orderProducts = action.payload;
        },
        setOrderAddress: (state, action) => {
            state.orderAddress = action.payload
        },
        setUserOrders: (state, action) => {
            state.userOrders = action.payload
        }
    },
});

export const { setOrderProducts, setOrderAddress, setUserOrders } = orderSlice.actions;

export default orderSlice.reducer;