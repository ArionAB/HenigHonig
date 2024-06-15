import { CartItemsModel } from "../Models/Cart/CartItemsModel";
import { CartModel } from "../Models/Cart/CartModel";
import { Tables } from "../Models/Database";
import { RootState } from "../store";

export const selectCartItems = (state: RootState): CartItemsModel[] => {
    return state.cart.cartItems;
};
/* export const selectCartItems = (state: RootState): Tables<'cart_products'>[] => {
    return state.cart.cartItems;
}; */

export const selectLoadingCart = (state: RootState): boolean => {
    return state.cart.loadingCart;
};

export const selectTotalPrice = (state: RootState): number => {
    return state.cart.totalPrice;
};

export const selectAbandonedCarts = (state: RootState): any[] => {
    return state.cart.abandonedCarts;
};

export const selectAbandonedCartsFilters = (
    state: RootState
): {
    count: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
} => {
    return state.cart.filters;
};
