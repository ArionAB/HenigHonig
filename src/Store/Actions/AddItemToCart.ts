import { Tables } from '../Models/Database';
import { Dispatch } from 'redux';
import { setCartItems } from '../slices/CartSlice';
import supabase from '../../../utils/supabase/createClient';
import { selectCartItems } from '../selectors/cartSelectors';
import { RootState } from '../store';
import { CartItemsModel } from '../Models/Cart/CartItemsModel';




// The action creator is no longer asynchronous
export const addItemToCart = (item: CartItemsModel) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            let newItem = {
                ...item,
                cart_id: item.user_id
            }

            const { products, ...newItemWithoutProducts } = newItem;

            const { data, error } = await supabase
                .from('cart_products')
                .insert([newItemWithoutProducts])
                .select();

            if (error) {
                throw error;
            } else {
                const cartItems = selectCartItems(getState())

                let appendItemToCart = {
                    ...data[0],
                    products: products
                }
                let newCartItems = [...cartItems, appendItemToCart]
                dispatch(setCartItems(newCartItems));
            }



        } catch (error) {
            console.error('Error adding item to cart:', error);
            // Optionally dispatch an error action or handle the error in another way
        }
    };
};
