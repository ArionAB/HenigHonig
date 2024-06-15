import { Dispatch } from 'redux';
import { selectCartItems } from '../selectors/cartSelectors';
import { setCartItems } from '../slices/CartSlice';
import { RootState } from '../store';
import supabase from '../../../utils/supabase/createClient';

export const removeItem = (cart_product_id: string) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { error } = await supabase
                .from('cart_products')
                .delete()
                .eq('id', cart_product_id)
                .select()

            if (!error) {
                const cartItems = selectCartItems(getState()) // Use getState to get current state and pass it to the selector
                let newCartItems = cartItems.filter((item) => item.id === cart_product_id)
                dispatch(setCartItems(newCartItems))
            }

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
};
