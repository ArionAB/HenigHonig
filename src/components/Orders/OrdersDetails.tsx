'use client'

import { FC, useState, useEffect } from "react";
import styles from "@/styles/orderDetails.module.scss";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";
import { Tables } from "@/Store/Models/Database";
import { OrderModel } from "@/Store/Models/Order/OrderModel";
import Image from "next/image";
import { getImage } from "../../../utils/Functions/GetImage";



const OrderDetails: FC<{ selectedOrder: OrderModel | null }> = ({
    selectedOrder,
}) => {
    const [order, setOrder] = useState<OrderModel | null>(selectedOrder);

    useEffect(() => {
        setOrder(selectedOrder);

        //eslint disable-next-line
    }, [selectedOrder]);

    const handleConvertFruitTypeToLabel = (selectedFruits: string[]) => {
        return selectedFruits.join(', ');

    };

    return (
        <div className={styles.container}>
            <h5 className={styles.order_id}>
                Coamnda #{order?.id}
                <span>({order?.orders_products?.length})</span>
            </h5>
            {order?.orders_products?.map((product: Tables<'orders_products'>) => (
                <div
                    className={styles.each_order}
                    key={product.id + product.fruit_type + product.size_type}
                >
                    <div className={styles.left}>
                        <Image src={getImage(product.images! && product.images[1])}
                            width={150}
                            height={150}
                            alt={product.title ?? ''}
                            style={{ objectFit: "contain" }}
                            placeholder='blur'
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMDAgMjAwQzE1NS4yMjkgMjAwIDIwMCAxNTUuMjI5IDIwMCAxMDBDMjAwIDQ0Ljc3MSAxNTUuMjI5IDAgMTAwIDBDMzQuNzcxIDAgMCA0NC43NzEgMCAxMDBDMCAxNTUuMjI5IDQ0Ljc3MSAyMDAgMTAwIDIwMFoiIGZpbGw9IiNDNkM2QzYiLz4KPC9zdmc+Cg=="
                        />
                        <div className={styles.product}>
                            <h6 className={styles.title}>
                                {product?.title}
                            </h6>
                            <span className={styles.product_category}>
                                {product?.product_type}
                            </span>
                            {product.fruit_type === 'Mixed' ? (
                                <span className={styles.fruit_type}>
                                    Tip fruct: {handleConvertFruitTypeToLabel(product?.mixed_fruit_id!)}
                                </span>
                            ) : (
                                <span className={styles.fruit_type}>
                                    Tip fruct: {product?.fruit_type}
                                </span>
                            )}

                            <span>{product.size_type}</span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        {product.quantity * product.price} lei
                        <span>{product.quantity}x buc.</span>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default OrderDetails