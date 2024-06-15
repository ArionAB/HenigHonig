import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import supabase from "../../../utils/supabase/createClient";
import { TablesInsert } from "../Models/Database";

export const addOrderProducts = (orders_products: TablesInsert<'orders_products'>) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data, error } = await supabase
                .from('orders_products')
                .insert(orders_products)
                .select()

            if (!error) {
                return {
                    severity: 'success',
                    data: data
                }

            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error adding order:', error);
        }
    };
};
