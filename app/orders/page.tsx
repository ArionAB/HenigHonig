'use client'

import { useEffect, useState } from "react";
import styles from "@/styles/orders.module.scss";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { selectUserOrders } from "@/Store/selectors/orderSelectors";
import { getUserOrders } from "@/Store/Actions/GetUserOrders";
import OrdersHistory from "@/components/Orders/OrdersHistory";
import { Enums, Tables } from "@/Store/Models/Database";
import OrderDetails from "@/components/Orders/OrdersDetails";
import { OrderModel } from "@/Store/Models/Order/OrderModel";


const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const userOrders = useAppSelector(selectUserOrders);
    //   const filters = useAppSelector(selectOrdersFilters);
    /*   const getPaginatedOrders = () => {
        return dispatch(
          getOrders({
            token: currentUser?.jwtToken,
            filters: filters,
          })
        );
      }; */

    /*      useEffect(() => {
           let promise = getPaginatedOrders();
           return () => promise.abort();
           //eslint-disable-next-line
         }, [filters, currentUser]);  */

    useEffect(() => {
        console.log(currentUser)
        const fetchOrders = async () => {
            try {
                dispatch(getUserOrders(currentUser?.id!))
            } catch (error) {
                console.error(error)
            }
        }
        fetchOrders()

    }, [currentUser])


    const showStatusColor = (status: Enums<'status_type'>) => {
        switch (status) {
            case 'Pending':
                return 'pending';
            case 'Shipped':
                return 'shipped';
            case 'Delivered':
                return 'delivered';
            case 'Cancelled':
                return 'cancelled';
            default:
                return 'pending';
        }
    };

    console.log('userOrders', userOrders)

    return (
        <div className={styles.page_container}>
            {!userOrders ? (
                <div> className={styles.noOrders}
                    <h3 >
                        Nu aveți nicio comandă.{" "}
                    </h3>
                    <a href="/">
                        <button
                            //   startIcon={<ShoppingCartIcon />}
                            className={styles.continueBTN}
                        >
                            Continuă cumpărăturile
                        </button>
                    </a>
                </div>
            ) : (
                <>
                    <button
                        className={styles.drawerBTN}
                        onClick={() => setOpenDrawer(true)}
                    // endIcon={<KeyboardDoubleArrowRightIcon />}
                    >
                        Instoricul comenzilor
                    </button>
                    {/* <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <OrdersHistory
              setSelectedOrder={setSelectedOrder}
              setOpenDrawer={setOpenDrawer}
            />
          </Drawer> */}
                    <div className={styles.container}>
                        <div className={styles.history_container}>
                            <OrdersHistory
                                setSelectedOrder={setSelectedOrder}
                                setOpenDrawer={setOpenDrawer}
                            />
                        </div>
                        <div className={styles.orders_container}>
                            <OrderDetails selectedOrder={selectedOrder} />
                            <div className={styles.order_info}>
                                <h5 className={styles.title}>
                                    Informații despre comanda
                                </h5>
                                <div className={styles.between}>
                                    <p className={styles.left}>Nume</p>
                                    <p className={styles.right}>
                                        {selectedOrder?.orders_address[0]?.first_name}
                                        {selectedOrder?.orders_address[0]?.last_name}
                                    </p>
                                </div>
                                <div className={styles.between}>
                                    <p className={styles.left}>Număr telefon</p>
                                    <p className={styles.right}>
                                        {selectedOrder?.orders_address[0]?.phone}
                                    </p>
                                </div>
                                <div className={styles.between}>
                                    <p className={styles.left}>
                                        Adresa de livrare
                                    </p>
                                    <p className={styles.right}>
                                        {selectedOrder?.orders_address[0]?.address},{" "}
                                        {selectedOrder?.orders_address[0]?.city},{" "}
                                        {selectedOrder?.orders_address[0]?.county}
                                    </p>
                                </div>
                                <div className={styles.between}>
                                    <p className={styles.left}>
                                        Status comandă
                                    </p>
                                    <p data-active={showStatusColor(selectedOrder?.status_type!)} className={styles.right}>
                                        {selectedOrder?.status_type}
                                    </p>
                                </div>
                                <div className={styles.total}>
                                    <p className={styles.left}>Total</p>
                                    <p className={styles.right}>
                                        {selectedOrder?.total_price} lei
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Orders
// export default withAuth(Orders, false);
