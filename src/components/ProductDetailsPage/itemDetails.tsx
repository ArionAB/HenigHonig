'use client'
import styles from "@/styles/productDetails.module.scss"
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import supabase from "../../../utils/supabase/createClient";
import { Enums, Tables } from "@/Store/Models/Database";

const ItemDetails: FC<{
    item: Tables<'products'>
}> = ({ item }) => {
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [sizeValue, setSizeValue] = useState<Enums<'size_type'>>("Big")
    const [images, setImages] = useState<string[]>([])

    const getImage = (url: string) => {
        const { data } = supabase
            .storage
            .from('henig')
            .getPublicUrl(url)
        return data.publicUrl
    }

    useEffect(() => {
        if (item.images) {
            setImages(() => [...item.images!.map(getImage)]);
        }
    }, [item]);



    return (
        <div className={styles.container}>
            <div className={styles.images}>
                <div className={styles.image_box}>
                    <Image src={images[imageIndex]}
                        width={250}
                        height={300}
                        alt={item.title ?? ''}
                        placeholder='blur'
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="

                    />
                </div>
                {<div>
                    {images?.map((img, index) => {
                        return (
                            <Image
                                key={index}
                                src={img}
                                alt={item?.title ?? ''}
                                width={100}
                                height={100}
                                placeholder='blur'
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                                onClick={() => setImageIndex(index)}
                                className={styles.thumbImage}
                            />
                        )
                    })}
                </div>}
            </div>
            <div className={styles.details}>
                <h1 className={styles.title}>
                    {item?.title}
                </h1>
                <p className={styles.price}>
                    {sizeValue === 'Big' ? item?.price_kg : item?.price_half} lei
                </p>
                <p >Alege mărimea borcanului</p>

                <div className={styles.selectSize}>
                    <button
                        className={styles.sizeBTN}
                        data-active={sizeValue === 'Small'}
                        onClick={() => setSizeValue("Small")}
                    >
                        500 g
                    </button>
                    <button
                        onClick={() => setSizeValue('Big')}
                        data-active={sizeValue === 'Big'}
                        className={styles.sizeBTN}
                    // data-active={Number(sizeValue) === SizeType.Big}
                    >
                        1000 g
                    </button>
                </div>

                {/* {Number(item?.fruitType) === FruitType.mixed && (
                <div className={styles.selectFruits}>
                    <p >Alege maxim 3 fructe</p>

                    <Paper elevation={2}>
                        {FruitItems.map((fruit) => {
                            if (
                                fruit.value === FruitType.mixed ||
                                fruit.value === FruitType.nothing
                            ) {
                                return null;
                            } else {
                                return (
                                    <MenuItem
                                        onClick={() =>
                                            handlePickFruits(fruit.value as FruitType)
                                        }
                                        key={fruit.value}
                                        value={fruit.value}
                                        divider
                                        data-active={mixedFruitId.includes(fruit.value)}
                                    >
                                        {fruit.label}
                                    </MenuItem>
                                );
                            }
                        })}
                    </Paper>
                </div>
                )} */}

                <p className={styles.caption}>
                    Cantitate
                </p>
                {/* <p className={styles.error}>{error}</p> */}
                <div className={styles.qty}>
                    <div className={styles.adjust_qty}>
                        {/* <Remove onClick={() => handleQuantity("remove")} /> */}
                        <input
                            defaultValue={1}
                            // value={selectedQuantity}
                            className={styles.qtyNumber}
                        // onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                        />
                        {/* <Add onClick={() => handleQuantity("add")} /> */}
                    </div>
                    <button
                        className={styles.addCart}
                        // onClick={handleAddToCart}
                        disabled={!item.in_stock}
                    >
                        {item && item.in_stock ? "Adaugă în coș" : "Stoc epuizat"}
                    </button>
                </div>

                <p
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.description}
                >
                    {item && item?.description!.split("<br/>").join("\n")}
                </p>
            </div>
        </div>
    )
}

export default ItemDetails