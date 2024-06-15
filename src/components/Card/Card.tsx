'use client'

import React, { FC, useState } from 'react'
import { HydrationProvider, Client } from "react-hydration-provider";
import styles from "@/styles/card.module.scss"
import Image from 'next/image';
import Link from 'next/link';
import Dialog from '../Dialog';
import { Options } from '../Options/Options';
import { Tables } from '@/Store/Models/Database';
import { usePageWidth } from '../../../utils/hooks/usePageWidth';
import { useAppDispatch } from '@/Store/hooks';
import { getImage } from '../../../utils/Functions/GetImage';
import { setCartItems } from '@/Store/slices/CartSlice';
import ItemDetails from '../ProductDetailsPage/itemDetails';


const Card: FC<{
    item: Tables<'products'>,
    index: number
}> = ({ item, index }) => {
    const [editDialog, setEditDialog] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(true);
    const [containerIndex, setContainerIndex] = useState<number>(0);
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [detailsDialog, setDetailsDialog] = useState<boolean>(false)
    const [optionsDialog, setOptionsDialog] = useState<boolean>(false)


    const pageWidth = usePageWidth();
    const dispatch = useAppDispatch()


    return (
        <HydrationProvider >
            <Client>
                <div className={styles.container}
                    style={{
                        borderRadius:
                            (expand && containerIndex === index) || pageWidth < 900
                                ? "0px"
                                : "40px",
                    }}
                    onMouseEnter={() => {
                        setExpand(true);
                        setContainerIndex(index);
                        setImageIndex(1)
                    }}
                    onMouseLeave={() => {
                        setExpand(false);
                        setImageIndex(0)
                    }}
                >
                    {!item.in_stock && <div className={styles.ribbon}>Out of Stock</div>}
                    <Link href={{
                        pathname: `/miere/${item.id?.replaceAll(" ", "_")}`,
                        query: item.id
                    }}>
                        <h1 className={styles.title}>{item.title}</h1>

                        <Image src={getImage(item.images! && item.images[imageIndex])}
                            width={250}
                            height={300}
                            alt={item.title ?? ''}
                            placeholder='blur'
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                        />

                        <div className={styles.price}>
                            <p>{item.price_kg} lei</p>
                            <span> 1 kg</span>
                        </div>
                    </Link>
                    {(pageWidth < 900 || (expand && containerIndex === index)) && (
                        <div className={styles.bottom}>
                            <div className={styles.twoButtons}>
                                {/* <button className={styles.shop} onClick={() => setOpenShop(true)}> */}
                                <button className={styles.shop} onClick={() => setDetailsDialog(true)}>
                                    Detalii
                                </button>
                                <button
                                    className={styles.options}
                                    onClick={() => setOptionsDialog(true)}
                                >
                                    Opțiuni
                                </button>
                            </div>
                        </div>
                    )}

                    {
                        detailsDialog && (
                            <Dialog closeDialog={setDetailsDialog}>
                                <ItemDetails item={item} />
                            </Dialog>
                        )
                    }
                    {
                        optionsDialog && (
                            <Dialog closeDialog={setOptionsDialog}>
                                <Options item={item} closeDialog={setOptionsDialog} />
                            </Dialog>
                        )
                    }



                </div>
            </Client>

        </HydrationProvider>

    )
}

export default Card