'use client'
import { FC, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/cartModal.module.scss"
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { Client, HydrationProvider } from "react-hydration-provider";
import { Enums, Tables } from "@/Store/Models/Database";
import { setCartItems } from "@/Store/slices/CartSlice";
import { changeQuantity } from "@/Store/Actions/ChangeQuantity";
import { removeItem } from "@/Store/Actions/RemoveItem";
import { selectCartItems } from "@/Store/selectors/cartSelectors";
import { CartItemsModel } from "@/Store/Models/Cart/CartItemsModel";
import { getImage } from "../../../utils/Functions/GetImage";
import { ConvertSizeToLabel } from "../../../utils/Functions/ConvertSizeToLabel";
import { TotalPrice } from "../../../utils/Functions/TotalPrice";



const CartModal: FC<{ setOpenDialog: Function }> = ({
    setOpenDialog,
}) => {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(selectCurrentUser)
    const cartItems = useAppSelector(selectCartItems)


    const handleChangeCartItemsQty = (
        action: "add" | "remove" | "select",
        productId: string,
        sizeType: Enums<'size_type'>,
        cartProductId: string,
        quantity: number,
        selectedValue?: number
    ) => {
        if (currentUser) {
            let qty =
                action === "add"
                    ? quantity + 1
                    : action === "select"
                        ? (quantity = selectedValue!)
                        : quantity - 1
            dispatch(
                changeQuantity(cartProductId, qty)
            )
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            const newCartItems = cartItems.map((item: Tables<'cart_products'>) => {
                if (item.product_id === productId && item.size_type === sizeType) {
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

    const handleRemoveItem = (
        cartProductId: string,
        sizeType: Enums<'size_type'>,
        productId?: string
    ) => {
        if (currentUser) {
            dispatch(
                removeItem(cartProductId)
            )
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            const newCartItems = cartItems.filter((item: Tables<'cart_products'>) =>
                item.product_id !== productId
                    ? true
                    : item.size_type !== sizeType
                        ? true
                        : false
            );
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(setCartItems(newCartItems));
        }
    };
    return (
        <HydrationProvider>
            <Client>
                <div className={styles.container}>
                    {!cartItems ? (
                        <>
                            <Image
                                src="/empty_cart.svg"
                                alt="cos gol"
                                width={75}
                                height={75}
                                className={styles.empty_svg}
                            />
                            <p className={styles.empty_title}>
                                Coșul de cumpărături este gol
                            </p>
                            <p className={styles.empty_text}>
                                Bun venit! Daca ați avut produse în coșul de cumpărături le-am
                                salvat pentru dumneavoastră.{" "}
                                <span onClick={() => setOpenDialog(true)}>SIGN IN</span> ca să le
                                vedeți.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className={styles.cart}>
                                {cartItems.map((item: CartItemsModel) => (
                                    <div key={item.id} className={styles.item}>
                                        <Image
                                            src={item?.products?.images ? getImage(item.products.images[0]) : '/empty_cart.svg'}
                                            width={150}
                                            height={90}
                                            className={styles.image}
                                            alt={item.products.title ?? ''}
                                        />
                                        <div className={styles.details}>
                                            <p className={styles.title}>{item.products.title}</p>
                                            <p className={styles.size}>
                                                {ConvertSizeToLabel(item.size_type)}
                                            </p>

                                            <div className={styles.qty_total}>
                                                <div className={styles.price}>
                                                    <span>  {item.size_type === 'Big'
                                                        ? item.products.price_kg
                                                        : item.products.price_half}
                                                        lei</span>

                                                </div>
                                                <div className={styles.qty}>
                                                    <svg className={styles.remove}
                                                        onClick={() => {
                                                            if (item.quantity === 1) return;
                                                            handleChangeCartItemsQty(
                                                                "remove",
                                                                item.product_id!,
                                                                item.size_type,
                                                                item.id,
                                                                Number(item.quantity)
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
                                                                item.product_id!,
                                                                item.size_type,
                                                                item.id,
                                                                Number(item.quantity),
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                    <svg className={styles.add}
                                                        onClick={() =>
                                                            handleChangeCartItemsQty(
                                                                "add",
                                                                item.product_id!,
                                                                item.size_type,
                                                                item.id,
                                                                Number(item.quantity)
                                                            )} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <p className={styles.title}>
                                                    Total:
                                                    <span className={styles.price}>
                                                        {item.size_type === 'Big'
                                                            ? Number(item.products.price_kg) * Number(item.quantity)
                                                            : Number(item.products.price_half) * Number(item.quantity)}
                                                        lei
                                                    </span>
                                                </p>
                                            </div>
                                            <svg className={styles.delete} onClick={() =>
                                                handleRemoveItem(
                                                    item.id,
                                                    item.size_type,
                                                    item.product_id!
                                                )
                                            } version="1.1" id="Layer_1" width="30px" height="30px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="3" />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                <g id="SVGRepo_iconCarrier"> <g> <polyline fill="none" stroke="rgb(61, 40, 45)" strokeWidth="3" strokeMiterlimit="10" points="25,8 25,1 39,1 39,8 " /> <polyline fill="none" stroke="rgb(61, 40, 45)" strokeWidth="2" strokeMiterlimit="10" points="14,10 14,63 50,63 50,10 " /> <line fill="none" stroke="rgb(61, 40, 45)" strokeWidth="2" strokeMiterlimit="10" x1="10" y1="9" x2="54" y2="9" /> </g> <line fill="none" stroke="rgb(61, 40, 45)" strokeWidth="2" strokeMiterlimit="10" x1="39" y1="43" x2="25" y2="29" /> <line fill="none" stroke="rgb(61, 40, 45)" strokeWidth="2" strokeMiterlimit="10" x1="25" y1="43" x2="39" y2="29" /> </g>
                                            </svg>

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className={styles.free_shipping}>
                                {Number(TotalPrice(cartItems)) >= 200
                                    ? "Aveți transport gratuit!"
                                    : `Până la transport grauit lipsesc ${200 - Number(TotalPrice(cartItems))
                                    } lei`}
                            </p>
                            <div className={styles.totalSum}>
                                <p>
                                    Suma totală <span className={styles.tva}>TVA incl.</span>
                                </p>
                                <p className={styles.totalPrice}>
                                    {Number(TotalPrice(cartItems))} lei
                                </p>
                            </div>
                            <Link href="/checkout">
                                <button className={styles.buyNow}>
                                    Către casă
                                </button>
                            </Link>
                            <Link href="/cart">
                                <button className={styles.addCart}>
                                    Afișare coș cumpărături
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </Client>
        </HydrationProvider>
    );
};

export default CartModal
