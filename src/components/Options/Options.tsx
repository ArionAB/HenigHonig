'use client'
import React, { FC, useState } from "react";

import styles from "@/styles/options.module.scss"
import { Enums, Tables } from "@/Store/Models/Database";
import useAddItemToCart from "../../../utils/hooks/useAddItemToCart";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";
import { AddToCartModal } from "../Cart/AddToCartModal";

export const Options: FC<{
    closeDialog: Function;
    item: Tables<'products'>
}> = ({ closeDialog, item }) => {
    const [sizeValue, setSizeValue] = useState<Enums<'size_type'>>("Big")
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [mixedFruitId, setMixedFruitId] = useState<Enums<'fruit_type'>[]>([]);
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { addToCart }: any = useAddItemToCart({
        item: item,
        size: sizeValue,
        qty: Number(selectedQuantity),
        mixedFruitId: mixedFruitId,
        setOpenCart,
    });



    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleQuantity = (type: "add" | "remove") => {
        if (type === "add") {
            setSelectedQuantity((prev) => prev + 1);
            setError("");
        } else {
            if (selectedQuantity > 1) {
                setSelectedQuantity((prev) => prev - 1);
                setError("");
            }
        }
    };

    const handleAddToCart = () => {
        if (selectedQuantity === 0) {
            setError("Selectează cantitatea");
            return;
        }
        if (mixedFruitId.length < 1 && item.fruit_type === 'Mixed') {
            setError("Selectează cel puțin un tip de fructe");
        } else {
            addToCart();
            setOpenCart(true);
        }
    };

    const handlePickFruits = (fruit: Enums<'fruit_type'>) => {
        if (mixedFruitId.length === 3 && !mixedFruitId.includes(fruit)) return;
        if (mixedFruitId.includes(fruit)) {
            setMixedFruitId((prev) => prev.filter((name) => name !== fruit));
        } else setMixedFruitId((prev) => [...prev, fruit].sort());
    };

    return (
        // <Dialog open={open}>
        <>
            <AddToCartModal open={openCart} onClose={handleCloseCart} />

            <div className={styles.options}>
                <div className={styles.title_close}>
                    <h5 className={styles.title}>
                        {item.title}
                    </h5>
                    <button onClick={() => closeDialog()} className={styles.closeBTN}>
                        X
                    </button>
                </div>
                <div className={styles.wrapper}>
                    <p className={styles.price}>
                        {sizeValue === 'Big' ? item?.price_kg : item?.price_half} lei
                    </p>
                    {
                        item.fruit_type !== 'Nothing' && (
                            <p className={styles.info}>
                                Procent fruct 20%, procent miere 80%.
                            </p>
                        )
                    }
                    <p>Alege mărimea borcanului</p>

                    <div className={styles.selectSize}>
                        <button
                            className={styles.sizeBTN}
                            data-active={sizeValue === 'Small'}
                            onClick={() => setSizeValue('Small')}
                        >
                            500 g
                        </button>
                        <button
                            onClick={() => setSizeValue('Big')}
                            className={styles.sizeBTN}
                            data-active={sizeValue === 'Big'}
                        >
                            1000 g
                        </button>
                    </div>
                    {item.fruit_type === 'Mixed' && (
                        <div className={styles.selectFruits}>
                            <p >Alege maxim 3 fructe</p>

                            <ul >
                                {fruitItems.map((fruit) => {
                                    if (
                                        fruit === 'Mixed' ||
                                        fruit === 'Nothing'
                                    ) {
                                        return null;
                                    } else {
                                        return (
                                            <li
                                                className={styles.menuItem}
                                                onClick={() =>
                                                    handlePickFruits(fruit)
                                                }
                                                key={fruit}
                                                data-active={mixedFruitId.includes(fruit)}
                                            >
                                                {fruit}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    )}

                    <p className={styles.caption} >
                        Cantitate
                    </p>
                    <p className={styles.error}>{error}</p>
                    <div className={styles.qty}>
                        <button onClick={() => handleQuantity("remove")}>X</button>
                        <input
                            defaultValue={1}
                            value={selectedQuantity}
                            className={styles.qtyNumber}
                            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                        />
                        <button onClick={() => handleQuantity("add")}>+</button>
                        <button
                            className={styles.addCart}
                            onClick={handleAddToCart}
                            disabled={!item.in_stock}
                        >
                            {item.in_stock ? "Adaugă în coș" : "Stoc epuizat"}
                        </button>
                    </div>
                </div>
            </div>

            {/* </Dialog> */}
        </>
    );
};
