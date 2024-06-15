'use client'

import { FC, useState, useEffect } from "react";
import styles from "@/styles/ordersHistory.module.scss";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectUserOrders } from "@/Store/selectors/orderSelectors";
import { Enums, Tables } from "@/Store/Models/Database";
import { OrderModel } from "@/Store/Models/Order/OrderModel";


const OrdersHistory: FC<{
    setSelectedOrder: Function;
    setOpenDrawer: Function;
}> = ({ setSelectedOrder, setOpenDrawer }) => {
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");
    const orders = useAppSelector(selectUserOrders);
    //   const filters = useAppSelector(selecOrdersFilters);
    const dispatch = useAppDispatch();

    const showStatusColor = (status: Enums<'status_type'>) => {
        switch (status) {
            case 'Pending':
                return styles.pending;
            case 'Shipped':
                return styles.shipped;
            case 'Delivered':
                return styles.delivered;
            case 'Cancelled':
                return styles.cancelled;
            default:
                return styles.pending;
        }
    };

    //   const handlePageChange = (event: any, page: number) => {
    //     if (page - 1 !== filters.pageNumber) {
    //       dispatch(
    //         setOrdersFilters({
    //           ...filters,
    //           pageNumber: page - 1,
    //         })
    //       );
    //     }
    //   };

    //   const loadingOrders = useAppSelector(selectLoadingOrders);

    useEffect(() => {
        setSelectedOrderId(orders[0]?.id);
        setSelectedOrder(orders[0]);
    }, []);

    return (
        <>
            <div className={styles.orders_history}>
                <div className={styles.closeDrawer}>
                    <h5 className={styles.history}>
                        Istoricul comenzilor
                    </h5>
                    {/* <Close onClick={() => setOpenDrawer(false)} /> */}
                </div>

                {/* {loadingOrders && (
          <div className={styles.skeletons}>
            <Skeleton variant="rectangular" width="100%" height={70} />
            <Skeleton variant="rectangular" width="100%" height={70} />
            <Skeleton variant="rectangular" width="100%" height={70} />
          </div>
        )} */}
                {orders &&
                    orders?.map((order: OrderModel) => (
                        <div
                            className={styles.order}
                            key={order.id}
                            onClick={() => {
                                setSelectedOrder(order);
                                setSelectedOrderId(order.id);
                                setOpenDrawer(false);
                            }}
                            style={
                                order.id === selectedOrderId
                                    ? {
                                        backgroundColor: "aliceBlue",
                                        borderLeft: "3px solid #356aee",
                                    }
                                    : { backgroundColor: "#fff" }
                            }
                        >
                            <span className={styles.order_id}>#{order.id}</span>
                            <div className={styles.row}>
                                <div className={styles.left_box}>
                                    <span className={styles.total_price}>
                                        {order.total_price} lei
                                    </span>
                                    <span className={styles.total_items}>
                                        {order?.orders_products?.length} produse
                                    </span>
                                </div>
                                <div className={styles.right_box}>
                                    <span className={showStatusColor(order.status_type!)}>
                                        {order.status_type}
                                        {/* {ConvertStatusToLabel(Number(order.status))} */}
                                    </span>
                                    <span className={styles.date}>
                                        {order.created_at}
                                        {/* {getDateLabel(order.dateCreated, dateTimeFormatOptions)} */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* <Stack spacing={2} className={styles.pagination}>
        <Pagination
          page={filters.pageNumber + 1}
          count={orders.totalPages + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack> */}
        </>
    );
};

export default OrdersHistory;