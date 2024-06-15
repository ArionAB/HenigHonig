'use client'

import React, { FC, forwardRef, ReactElement, Ref } from "react";
import Link from "next/link";
import styles from "@/styles/addToCartModal.module.scss"
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectCartItems } from "@/Store/selectors/cartSelectors";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { Enums } from "@/Store/Models/Database";
import { removeItem } from "@/Store/Actions/RemoveItem";
import { setCartItems } from "@/Store/slices/CartSlice";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";
import { TotalPrice } from "../../../utils/Functions/TotalPrice";
import { getImage } from "../../../utils/Functions/GetImage";
import Image from "next/image";
import { ConvertSizeToLabel } from "../../../utils/Functions/ConvertSizeToLabel";

export const AddToCartModal: FC<{
    open: boolean;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}> = ({ open, onClose }) => {
    const cartItems = useAppSelector(selectCartItems);

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const handleRemoveItem = (
        cartProductId: string,
        sizeType: Enums<'size_type'>,
        mixedFruitId: Enums<'fruit_type'>[],
        productId?: string
    ) => {
        if (currentUser) {
            dispatch(
                removeItem(cartProductId))
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

            const newCartItems = cartItems.filter((item: any) =>
                item.productId !== productId
                    ? true
                    : item.sizeType !== sizeType
                        ? true
                        : JSON.stringify(item.mixedFruitId) !== JSON.stringify(mixedFruitId)
                            ? true
                            : false
            );

            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(setCartItems(newCartItems));
        }
    };

    const handleConvertFruitTypeToLabel = (selectedFruits: Enums<'fruit_type'>[]) => {
        const labels = selectedFruits?.map((fruit) => {
            const item = fruitItems.find((item) => item === fruit);
            if (item) {
                return item
            }
        });
        return labels?.join(", ");
    };

    return (
        <div className={styles.dialogContainer} style={open ? { 'transform': "translateX(30px)" } : { 'transform': 'translateX(400px)' }}>
            <div className={styles.paper}>
                <div
                    className={styles.dialogDetails}
                >
                    <div className={styles.modal}>
                        <div className={styles.arrowCart}>
                            {/* <EastIcon onClick={(e) => onClose(e, "backdropClick")} /> */}
                            <svg width="25px" height="25px" onClick={(e) => onClose(e, "backdropClick")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link href="/cart">Coșul tău</Link>
                        </div>
                        <div className={styles.cartItems}>
                            {cartItems?.map((item) => {
                                return (
                                    <div
                                        className={styles.cartItem}
                                        key={
                                            item.product_id +
                                            item.size_type +
                                            item.fruit_type +
                                            item.mixed_fruit_id
                                        }
                                    >
                                        <div className={styles.productDetails}>
                                            <div className={styles.image_container}>
                                                <Image src={item?.products?.images ? getImage(item.products.images[0]) : '/empty_cart.svg'}
                                                    alt={item.products.title ?? ''}
                                                    fill
                                                    className={styles.cartItemImage}
                                                />
                                            </div>
                                            <div className={styles.info}>
                                                <h1 className={styles.title}>
                                                    {item.products.product_type}
                                                </h1>
                                                <p>
                                                    {item.products.fruit_type}
                                                </p>
                                                <p className={styles.fruits}>
                                                    {handleConvertFruitTypeToLabel(item.mixed_fruit_id ?? [])}
                                                </p>
                                                <p className={styles.qty}>
                                                    {ConvertSizeToLabel(item.size_type)}
                                                </p>
                                                <p className={styles.qty}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.closeBox}>
                                            <svg onClick={() =>
                                                handleRemoveItem(
                                                    item.id,
                                                    item.size_type,
                                                    item.mixed_fruit_id ?? [],
                                                    item.product_id!
                                                )
                                            } aria-hidden="true" focusable="false" role="presentation" width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.08785659,5 L9.77469752,1.31315906 L8.68684094,0.225302476 L5,3.91214341 L1.31315906,0.225302476 L0.225302476,1.31315906 L3.91214341,5 L0.225302476,8.68684094 L1.31315906,9.77469752 L5,6.08785659 L8.68684094,9.77469752 L9.77469752,8.68684094 L6.08785659,5 Z"></path>
                                            </svg>
                                            <p className={styles.price}>
                                                {
                                                    item.size_type === 'Big' ? item.products.price_kg : item.products.price_half
                                                }
                                                lei
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.totalSum}>
                                <p>
                                    Suma totală <span className={styles.tva}>TVA incl.</span>
                                </p>
                                <p className={styles.totalPrice}>
                                    {TotalPrice(cartItems)} lei
                                </p>
                            </div>
                            <Link href="/checkout">
                                <button className={styles.buyNow} >
                                    Către casă
                                </button>
                            </Link>
                            <Link href="/cart">
                                <button className={styles.addCart} >
                                    Afișare coș cumpărături
                                </button>
                            </Link>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
