import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import supabase from "../../../utils/supabase/createClient";
import { setUserOrders } from "../slices/OrderSlice";

export const getUserOrders = (user_id: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, orders_products(*), orders_address(*)')
                .eq('user_id', user_id)

            if (!error) {
                console.log('orders', data)
                dispatch(setUserOrders(data))

            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
};
