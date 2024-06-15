'use client'

import React, { useState, useEffect } from "react";
import styles from "@/styles/cart.module.scss"
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectCartItems } from "@/Store/selectors/cartSelectors";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { changeQuantity } from "@/Store/Actions/ChangeQuantity";
import { CartItemsModel } from "@/Store/Models/Cart/CartItemsModel";
import { setCartItems } from "@/Store/slices/CartSlice";
import { removeItem } from "@/Store/Actions/RemoveItem";
import { TotalPrice } from "../../utils/Functions/TotalPrice";
import { Enums } from "@/Store/Models/Database";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";
import { getImage } from "../../utils/Functions/GetImage";
import { ConvertSizeToLabel } from "../../utils/Functions/ConvertSizeToLabel";

const Cart = () => {
    const [selectValues, setSelectValues] = useState([
        {
            cartProductId: "",
            quantity: 1,
        },
    ]);

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const currentUser = useAppSelector(selectCurrentUser);

    const isNotEmpty = () => cartItems?.length > 0;

    const handleChangeCartItemsQty = (
        action: "add" | "remove" | "select",
        item: CartItemsModel,
        selectedValue?: number
    ) => {
        if (currentUser) {
            let qty =
                action === "add"
                    ? item.quantity! + 1
                    : action === "select"
                        ? (item.quantity = selectedValue!)
                        : item.quantity! - 1
            dispatch(
                changeQuantity(item.id, qty)
            )
                .then(() => {
                    const newCartItems = cartItems.map((cartItem: CartItemsModel) => {
                        if (item.product_id === cartItem.product_id && item.size_type === cartItem.size_type) {
                            return {
                                ...cartItem,
                                quantity:
                                    action === "add"
                                        ? Number(cartItem.quantity) + 1
                                        : action === "select"
                                            ? selectedValue
                                            : Number(cartItem.quantity) - 1,
                            };
                        }
                        return cartItem;
                    });
                    dispatch(setCartItems(newCartItems));
                });
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            const newCartItems = cartItems.map((item: CartItemsModel) => {
                if (item.product_id === item.product_id && item.size_type === item.size_type) {
                    return {
                        ...item,
                        quantity:
                            action === "add"
                                ? Number(item.quantity) + 1
                                : action === "select"
                                    ? selectedValue
                                    : Number(item.quantity) - 1,
                    };
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(setCartItems(newCartItems));
        }
    };

    useEffect(() => {
        const newValues: any = [...selectValues];
        cartItems?.forEach((item, index) => {
            newValues[index] = {
                productId: item.id,
                quantity: Number(item.quantity),
            };
            setSelectValues(newValues);
        });
        //eslint-disable-next-line
    }, [cartItems]);

    const handleRemoveItem = (
        cartItem: CartItemsModel
        // cartProductId: string,
        // sizeType: SizeType,
        // productId?: string
    ) => {
        if (currentUser) {
            dispatch(
                removeItem(cartItem.id)
            ).then(() => {
                const newCartItems = cartItems.filter((item: CartItemsModel) =>
                    cartItem.product_id !== item.product_id
                        ? true
                        : cartItem.size_type !== cartItem.size_type
                            ? true
                            : false
                );
                dispatch(setCartItems(newCartItems));
            });
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            const newCartItems = cartItems.filter((item: CartItemsModel) =>
                item.product_id !== item.product_id
                    ? true
                    : item.size_type !== cartItem.size_type
                        ? true
                        : false
            );

            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(setCartItems(newCartItems));
        }
    };

    const priceWithDelivery = () => {
        if (TotalPrice(cartItems) < 200) {
            return TotalPrice(cartItems) + 15;
        } else {
            return TotalPrice(cartItems);
        }
    };

    const handleConvertFruitTypeToLabel = (selectedFruits: Enums<'fruit_type'>[]) => {
        const labels = selectedFruits?.map((fruit) => {
            const item = fruitItems.find((item) => item === fruit);
            if (item) {
                return item;
            }
        });
        return labels?.join(", ");
    }
    return (
        <div className={styles.page_container}>
            <div className={styles.yourCartBox}>
                <h1
                    className={styles.yourCart}
                >
                    Coș de cumpărături
                </h1>
                {!isNotEmpty() && (
                    <Link href="/">
                        <p className={styles.continueLink}>
                            Continuă cumpărăturile
                        </p>
                    </Link>
                )}
            </div>
            <div className={styles.items_and_checkout}>
                <div
                    className={isNotEmpty() ? styles.cartBox : styles.emptyCartBox}
                    style={{ border: isNotEmpty() ? "none" : "1px solid #e3e3e3" }}
                >
                    {isNotEmpty() ? (
                        cartItems?.map((item, index) => {
                            return (
                                <div
                                    className={styles.cartItemBox}
                                    key={item.product_id + item.size_type + item.fruit_type}
                                >
                                    <div className={styles.sections}>
                                        <Image
                                            src={item?.products?.images ? getImage(item.products.images[0]) : "/empty_cart.svg"}
                                            alt={item.products.title ?? ''}
                                            className={styles.picture}
                                            width={175}
                                            height={175}
                                        />
                                        <div className={styles.rightSection}>
                                            <div className={styles.titlePriceSize}>
                                                <Link
                                                    className={styles.title}
                                                    href={`/miere/${item.products.title!.replaceAll(" ", "_")}`}
                                                >
                                                    {item.products.title}
                                                </Link>

                                                <p className={styles.price}>
                                                    {/* {handleConvertFruitTypeToLabel(item.fruit_type)} */}
                                                    {item.fruit_type}
                                                </p>

                                                <p className={styles.price}>
                                                    Pret: {item.products.price_kg} lei
                                                </p>
                                                <p className={styles.size}>
                                                    Marime: {ConvertSizeToLabel(item.size_type)}
                                                </p>
                                            </div>
                                            <div className={styles.qty}>
                                                <div className={styles.select_qty}>
                                                    <svg className={styles.modify}
                                                        onClick={() => {
                                                            if (item.quantity === 1) return;
                                                            handleChangeCartItemsQty(
                                                                "remove",
                                                                item
                                                            );
                                                        }} width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                                        <path d="M6 12L18 12" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <input
                                                        value={item.quantity ?? 1}
                                                        className={styles.qtyNumber}
                                                        onChange={(e) =>
                                                            handleChangeCartItemsQty(
                                                                "select",
                                                                item,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                    <svg className={styles.modify}
                                                        onClick={() =>
                                                            handleChangeCartItemsQty(
                                                                "add",
                                                                item
                                                            )} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className={styles.total_price}>
                                                    <p className={styles.cost}>{`${Number(item.products.price_kg) * Number(item.quantity)
                                                        } lei`}</p>
                                                    <svg className={styles.closeIcon} onClick={() =>
                                                        handleRemoveItem(item)
                                                    } aria-hidden="true" focusable="false" role="presentation" width="17" height="17" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.08785659,5 L9.77469752,1.31315906 L8.68684094,0.225302476 L5,3.91214341 L1.31315906,0.225302476 L0.225302476,1.31315906 L3.91214341,5 L0.225302476,8.68684094 L1.31315906,9.77469752 L5,6.08785659 L8.68684094,9.77469752 L9.77469752,8.68684094 L6.08785659,5 Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <p>Coșul tău de cumpărături este gol!</p>
                            <Link href="/">
                                <button
                                    className={styles.continueBTN}
                                >
                                    Continuă cumpărăturile
                                </button>
                            </Link>{" "}
                        </>
                    )}
                </div>
                {isNotEmpty() && (
                    <div className={styles.checkout}>
                        <div className={styles.priceBox}>
                            <p className={styles.total_text}>
                                Prețul total
                            </p>
                            <p className={styles.totalPrice}>
                                {priceWithDelivery()} lei
                            </p>
                        </div>
                        <p className={styles.free_shipping}>
                            {Number(TotalPrice(cartItems)) >= 200
                                ? "Aveți transport gratuit!"
                                : `Până la transport grauit lipsesc ${200 - Number(TotalPrice(cartItems))
                                } lei`}
                        </p>
                        <Link href="/checkout">
                            <button>Finzalizează comandă</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles.bottom}>
                <p >
                    Livrare gratuită la comenzile peste 200 de lei
                </p>
                <div>Cost livrare: {priceWithDelivery() >= 200 ? 0 : 15} lei</div>
                <div className={styles.totalBox}>
                    <h5 className={styles.total}>
                        Total
                    </h5>
                    <p className={styles.totalPrice}>
                        {priceWithDelivery()} lei
                    </p>
                </div>

                {isNotEmpty() ? (
                    <Link href="/checkout">
                        <button>Finalizează comandă</button>
                    </Link>
                ) : (
                    <Link href="/">
                        <button>Continuă cumpărăturile</button>
                    </Link>
                )}
            </div>
        </div>

    );
};

export default Cart;
