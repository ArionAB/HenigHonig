import { Dispatch } from 'redux';
import { setCartItems } from '../slices/CartSlice';
import supabase from '../../../utils/supabase/createClient';

export const getCartItems = (user_id: string) => {
    return async (dispatch: Dispatch) => {
        try {

            let { data: cart, error } = await supabase
                .from('cart')
                .select(`*,
            cart_products(*,
               products(*)
            )
            `)
                .eq('id', user_id)
            if (error) {
                throw error;
            }
            if (cart) {
                dispatch(setCartItems(cart[0].cart_products));
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
};
