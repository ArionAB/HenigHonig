'use client'

import { FC } from "react";
import { Enums, Tables } from "@/Store/Models/Database";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { addItemToCart } from "@/Store/Actions/AddItemToCart";
import { setCartItems } from "@/Store/slices/CartSlice";
import { CartItemsModel } from "@/Store/Models/Cart/CartItemsModel";
import { selectCartItems } from "@/Store/selectors/cartSelectors";
import { changeQuantity } from "@/Store/Actions/ChangeQuantity";

//@ts-ignore
const useAddItemToCart: FC<{
    item: Tables<'products'>;
    size: Enums<'size_type'>;
    qty: number;
    mixedFruitId?: Enums<'fruit_type'>[];
    setOpenCart: Function;
}> = ({ item, size, qty, setOpenCart, mixedFruitId }) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const cartItems = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch();

    const addToCart = () => {
        if (!currentUser) {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const alreadyExists = cart.find(
                (cartItem: CartItemsModel) =>
                    cartItem.product_id === item.id &&
                    cartItem.size_type === size &&
                    cartItem.products.fruit_type === item.fruit_type &&
                    JSON.stringify(cartItem.mixed_fruit_id) === JSON.stringify(mixedFruitId)
            );

            if (alreadyExists) {
                Object.keys(cart).forEach((key) => {
                    if (
                        cart[key].product_id === item.id &&
                        cart[key].size_type === size &&
                        cart[key].fruit_type === item.fruit_type &&
                        JSON.stringify(cart[key].mixed_fruit_id) ===
                        JSON.stringify(mixedFruitId)
                    ) {
                        cart[key].quantity += Number(qty);
                    }
                });
                localStorage.setItem("cart", JSON.stringify(cart));
                dispatch(
                    setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"))
                );
                setOpenCart(true);
            } else {
                localStorage.setItem(
                    "cart",
                    JSON.stringify([
                        ...cart,
                        {
                            ...item,
                            quantity: Number(qty),
                            sizeType: size,
                            mixedFruitId: mixedFruitId,
                        },
                    ])
                );
                dispatch(
                    setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"))
                );
                setOpenCart(true);
                return;
            }
        } else {
            let alreadyExists = cartItems.find(
                (cartItem: CartItemsModel) =>
                    cartItem.product_id === item.id &&
                    cartItem.size_type === size &&
                    cartItem.products.fruit_type === item.fruit_type &&
                    JSON.stringify(cartItem.mixed_fruit_id) === JSON.stringify(mixedFruitId)
            );

            if (alreadyExists) {
                let quantity = alreadyExists.quantity!
                dispatch(changeQuantity(alreadyExists.id, quantity += Number(qty)))
            } else {
                dispatch(
                    addItemToCart({
                        product_id: item.id,
                        quantity: Number(qty),
                        size_type: size,
                        mixed_fruit_id: mixedFruitId,
                        user_id: currentUser.id,
                        products: item
                    },
                    )
                )
            }
        }
    };

    return { addToCart };
};

export default useAddItemToCart;
