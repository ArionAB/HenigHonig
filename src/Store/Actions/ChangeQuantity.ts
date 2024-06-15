import { Dispatch } from 'redux';
import { setCartItems } from '../slices/CartSlice';
import { selectCartItems } from '../selectors/cartSelectors';
import { RootState } from '../store';
import { CartItemsModel } from '../Models/Cart/CartItemsModel';
import supabase from '../../../utils/supabase/createClient';

export const changeQuantity = (cart_product_id: string, qty: number) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const { data: cartItem, error } = await supabase
                .from('cart_products')
                .update({ quantity: qty })
                .eq('id', cart_product_id)
                .select('product_id, quantity, size_type')

            const cartItems = selectCartItems(getState()) // Use getState to get current state and pass it to the selector
            if (cartItem) {
                let cart: any = cartItem[0]!
                let newCartItems = cartItems.map((item: CartItemsModel) => {
                    if (item.product_id === cart.product_id && item.size_type === cart.size_type) {
                        return {
                            ...item,
                            quantity: cart.quantity
                        }
                    }
                    return item
                })
                dispatch(setCartItems(newCartItems))

            }


            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Error changing the quantity:', error);
        }
    };
};
