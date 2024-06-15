import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import supabase from "../../../utils/supabase/createClient";
import { TablesInsert } from "../Models/Database";

export const addOrderAddress = (orderAddress: TablesInsert<'orders_address'>) => {
    console.log('orderAddress', orderAddress)
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data, error } = await supabase
                .from('orders_address')
                .insert([orderAddress])
                .select()

            if (!error) {
                console.log('Order address', data)

            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error adding order_address:', error);
        }
    };
};
