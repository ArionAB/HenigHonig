import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import supabase from "../../../utils/supabase/createClient";
import { TablesInsert } from "../Models/Database";

export const addOrder = (order: TablesInsert<'orders'>) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([order])
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
