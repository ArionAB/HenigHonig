'use client'

import React, { useEffect, useState } from 'react'
import { useFormState } from '../../utils/hooks/useReactForm';
import { Enums, TablesInsert } from '@/Store/Models/Database';
import { ShippingAddressModel } from '@/Store/Models/Checkout/ShippingAddressModel';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { selectCartItems } from '@/Store/selectors/cartSelectors';
import { selectCurrentUser } from '@/Store/selectors/authSelectors';
import { TotalPrice } from '../../utils/Functions/TotalPrice';
import styles from "@/styles/checkout.module.scss"
import Link from 'next/link';
import ShippingAddress from '@/components/Checkout/ShippingAddress';
import Image from 'next/image';
import { CartItemsModel } from '@/Store/Models/Cart/CartItemsModel';
import { ConvertSizeToLabel } from '../../utils/Functions/ConvertSizeToLabel';
import { getImage } from '../../utils/Functions/GetImage';
import BillingAddress from '@/components/Checkout/BillingAddress';
import { updateUser } from '@/Store/Actions/UpdateUser';
import { addOrder } from '@/Store/Actions/AddOrder';
import { setOrderAddress, setOrderProducts } from '@/Store/slices/OrderSlice';
import { addOrderAddress } from '@/Store/Actions/AddOrderAddress';
import { addOrderProducts } from '@/Store/Actions/AddOrderProducts';

const Checkout = () => {
    const [hasErrors, setHasErrors] = useState(true);
    const [formState, setFormProp, setFormState] = useFormState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        info: "",
        zip_code: null,
        city: "",
        county: "",
        phone: "",
    });


    const [paymentMethod, setPaymentMethod] = useState<Enums<'payment_type'>>('Card');
    const [billing, setBilling] = useState<ShippingAddressModel | any>({});
    const [checkForErrors, setCheckForErrors] = useState(false);
    const [displayPayment, setDisplayPayment] = useState(false);
    const [activeBreadcrumb, setActiveBreadcrumb] = useState(2);
    const [sameAddress, setSameAddress] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const cartItems = useAppSelector(selectCartItems);

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const priceWithDelivery = () => {
        if (TotalPrice(cartItems) < 200) {
            return TotalPrice(cartItems) + 15;
        } else {
            return TotalPrice(cartItems);
        }
    };

    const handleBillingChange = (billingInfo: any) => {
        setBilling(billingInfo);
    };

    console.log('currentUser', currentUser)
    useEffect(() => {
        if (sameAddress) {
            setBilling({
                first_name_bill: formState.first_name,
                last_name_bill: formState.last_name,
                adress_bill: formState.address,
                info_bill: formState.info,
                zip_code_bill: formState.zip_code,
                city_bill: formState.city,
                county_bill: formState.county,
            });
        } else {
            setBilling({
                first_name_bill: billing.first_name_bill,
                last_name_bill: billing.last_name_bill,
                adress_bill: billing.adress_bill,
                info_bill: billing.info_bill,
                zip_code_bill: billing.zip_code_bill,
                city_bill: billing.city_bill,
                county_bill: billing.county_bill,
            });
        }

        //eslint-disable-next-line
    }, [sameAddress, formState]);

    const handleSubmit = () => {
        if (hasErrors || checkForErrors) return;

        setActiveBreadcrumb((prev) => prev + 1);
        setDisplayPayment(true);
        if (!currentUser) {
            localStorage.setItem("shipping", JSON.stringify(formState));
            localStorage.setItem("billing", JSON.stringify(formState));
            if (!sameAddress) {
                localStorage.setItem("billing", JSON.stringify(billing));
            }
            return;
        } else if (sameAddress) {
            const user = {
                ...formState,
                id: currentUser.id,
                first_name_bill: formState.first_name,
                last_name_bill: formState.last_name,
                adress_bill: formState.address,
                info_bill: formState.info,
                zip_code_bill: formState.zip_code,
                city_bill: formState.city,
                county_bill: formState.county,
            }
            dispatch(updateUser(user)).then(() => setDisplayPayment(true))


            // dispatch(
            //     updateUser({
            //         data: {
            //             ...formState,
            //             first_name_bill: formState.first_name,
            //             last_name_bill: formState.last_name,
            //             adress_bill: formState.address,
            //             info_bill: formState.info,
            //             zip_code_bill: formState.zip_code as number,
            //             city_bill: formState.city,
            //             county_bill: formState.county,
            //         },
            //         sameAddress: sameAddress,
            //         token: currentUser?.jwtToken,
            //     })
            // ).then(() => {
            //     dispatch(
            //         setCurrentUser({
            //             ...currentUser,
            //             first_name_bill: formState.first_name,
            //             last_name_bill: formState.last_name,
            //             adress_bill: formState.address,
            //             info_bill: formState.info,
            //             zip_code_bill: formState.zip_code,
            //             city_bill: formState.city,
            //             county_bill: formState.county,
            //             first_name: formState.first_name,
            //             last_name: formState.last_name,
            //             address: formState.address,
            //             info: formState.info,
            //             zip_code: formState.zip_code,
            //             city: formState.city,
            //             county: formState.county,
            //             phone: formState.phone,
            //         })
            //     );
            //     setDisplayPayment(true);
            // });
        } else {
            const user = {
                ...formState,
                id: currentUser.id,
                first_name_bill: billing.first_name_bill,
                last_name_bill: billing.last_name_bill,
                adress_bill: billing.adress_bill,
                info_bill: billing.info_bill,
                zip_code_bill: billing.zip_code_bill,
                city_bill: billing.city_bill,
                county_bill: billing.county_bill,
            }
            dispatch(updateUser(user)).then(() => setDisplayPayment(true))
            // dispatch(
            //     updateUser({
            //         data: {
            //             ...formState,
            //             first_name_bill: billing.first_name_bill,
            //             last_name_bill: billing.last_name_bill,
            //             adress_bill: billing.adress_bill,
            //             info_bill: billing.info_bill,
            //             zip_code_bill: billing.zip_code_bill,
            //             city_bill: billing.city_bill,
            //             county_bill: billing.county_bill,
            //         },
            //         sameAddress: sameAddress,
            //         token: currentUser?.jwtToken,
            //     })
            // ).then(() => {
            //     dispatch(
            //         setCurrentUser({
            //             ...currentUser,
            //             first_name_bill: billing.first_name_bill,
            //             last_name_bill: billing.last_name_bill,
            //             adress_bill: billing.adress_bill,
            //             info_bill: billing.info_bill,
            //             zip_code_bill: billing.zip_code_bill,
            //             city_bill: billing.city_bill,
            //             county_bill: billing.county_bill,

            //             first_name: formState.first_name,
            //             last_name: formState.last_name,
            //             address: formState.address,
            //             info: formState.info,
            //             zip_code: formState.zip_code,
            //             city: formState.city,
            //             county: formState.county,
            //             phone: formState.phone,
            //         })
            //     );
            //     setDisplayPayment(true);
            // });
        }
    };

    useEffect(() => {
        if (!hasErrors && !checkForErrors) {
            handleSubmit();
        }

        //eslint-disable-next-line
    }, [checkForErrors]);

    const placeOrder = () => {
        console.log('am dat click')
        // setLoadingOrder(true);

        const orderProducts: TablesInsert<'orders_products'>[] = [
            ...cartItems.map((item) => {
                return {
                    product_id: item.product_id ?? '',
                    title: item.products.title ?? '',
                    price:
                        item.size_type === 'Big'
                            ? Number(item.products.price_kg)
                            : Number(item.products.price_half),
                    size_type: item.size_type,
                    fruit_type: item.fruit_type,
                    quantity: Number(item.quantity),
                    product_type: item.products.product_type,
                    images: item.products.images,
                    mixed_fruit_id: item.mixed_fruit_id ?? "",
                    user_id: currentUser?.id ?? formState.email,
                    order_id: '',
                };
            })
        ]

        dispatch(setOrderProducts(orderProducts))

        const orderAddress: TablesInsert<'orders_address'> = {
            ...formState, ...billing
        }

        dispatch(setOrderAddress(orderAddress))

        dispatch(
            addOrder({
                user_id: currentUser?.id ?? 'Guest',
                status_type: 'Pending',
                payment_type: paymentMethod,
                total_price: priceWithDelivery()
            })
        )
            .then((res: any) => {
                setLoadingOrder(false);
                console.log('res', res)
                if (res.severity === 'success' && currentUser) {
                    dispatch(addOrderAddress({
                        ...orderAddress,
                        order_id: res.data[0].id,
                    }))

                    const arrayOfProducts: TablesInsert<'orders_products'>[] = orderProducts.map((product) => {
                        return {
                            ...product,
                            order_id: res.data[0].id
                        }
                    })

                    dispatch(addOrderProducts(arrayOfProducts))
                }
            })


        //     if (res.meta.requestStatus === "fulfilled" && currentUser) {
        //         dispatch(
        //             removeAllItems({
        //                 token: currentUser?.jwtToken,
        //             })
        //         ).then((res) => {
        //             if (res.meta.requestStatus === "fulfilled") {
        //                 dispatch(
        //                     addAppNotification({
        //                         message: "Comanda a fost plasată!",
        //                         severity: "success",
        //                     })
        //                 );
        //                 dispatch(resetCartState());
        //                 router.push("/orders");
        //             }
        //         });
        //     } else if (res.meta.requestStatus === "fulfilled" && !currentUser) {
        //         dispatch(
        //             addAppNotification({
        //                 message: "Comanda a fost plasată!",
        //                 severity: "success",
        //             })
        //         );
        //         dispatch(resetCartState());
        //         router.push("/");
        //     }
        // })
        // .catch((error) =>
        //     dispatch(
        //         addAppNotification({ message: error.message, severity: "error" })
        //     )
        // );
    }
    const NextIcon = () => {
        return (
            <svg className={styles.nextIcon} xmlns="http://www.w3.org/2000/svg" fill="#000000" height="10px" width="10px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
                <g id="next">
                    <g>
                        <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   " />
                    </g>
                </g>
            </svg>
        )
    }

    const breadcrumbs = [
        <Link key="1" color="inherit" href="/cart" className={styles.breadCart}>
            <span >Coș</span>
        </Link>,
        <NextIcon />,
        <span
            className={styles.breadDelivery}
            key="2"
            style={
                activeBreadcrumb === 2
                    ? { color: "#333" }
                    : { color: "#b06f2a", cursor: "pointer" }
            }
            onClick={() => {
                setDisplayPayment(false);
                setActiveBreadcrumb(2);
            }}
        >
            Detalii livrare
        </span>,
        <NextIcon />,
        <span
            className={styles.breadPrice}
            key="3"
            onClick={() => {
                handleSubmit();
            }}
            style={
                activeBreadcrumb === 3
                    ? { color: "#333" }
                    : { color: "#b06f2a", cursor: "pointer" }
            }
        >
            Plată
        </span>,
    ];



    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.breadcrumbs}>
                    {/* <Stack spacing={2}> */}
                    {/* <Breadcrumbs */}
                    {/* separator={<NavigateNextIcon fontSize="small" />} */}
                    {/* aria-label="breadcrumb" */}
                    {/* > */}
                    {breadcrumbs}
                    {/* </Breadcrumbs> */}
                    {/* </Stack> */}
                </div>
                {!displayPayment && activeBreadcrumb === 2 ? (
                    <ShippingAddress
                        setHasErrors={setHasErrors}
                        setFormProp={setFormProp}
                        formState={formState}
                        setFormState={setFormState}
                        checkForErrors={checkForErrors}
                        setCheckForErrors={setCheckForErrors}
                    />

                ) : (
                    <div className={styles.information}>
                        <div className={styles.contact}>
                            <p className={styles.label}>Contact:</p>

                            {currentUser ? (
                                <div className={styles.withEdit}>
                                    <p>{currentUser?.email}</p>
                                    <button
                                        onClick={() => {
                                            setDisplayPayment(false);
                                            setActiveBreadcrumb(2);
                                        }}
                                    >
                                        Editează
                                    </button>{" "}
                                </div>
                            ) : (
                                <div className={styles.withEdit}>
                                    <p>{formState.email}</p>{" "}
                                    <button
                                        onClick={() => {
                                            setDisplayPayment(false);
                                            setActiveBreadcrumb(2);
                                        }}
                                    >
                                        Editează
                                    </button>{" "}
                                </div>
                            )}
                        </div>
                        <div className={styles.contact}>
                            <p className={styles.label}>Adresa:</p>
                            {currentUser ? (
                                <div className={styles.withEdit}>
                                    <p>
                                        {currentUser?.profile.address}, {currentUser?.profile.city},{" "}
                                        {currentUser?.profile.county}
                                    </p>{" "}
                                    <button
                                        onClick={() => {
                                            setDisplayPayment(false);
                                            setActiveBreadcrumb(2);
                                        }}
                                    >
                                        Editează
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.withEdit}>
                                    <p>
                                        {formState.address}, {formState.city}, {formState.county}
                                    </p>{" "}
                                    <button
                                        onClick={() => {
                                            setDisplayPayment(false);
                                            setActiveBreadcrumb(2);
                                        }}
                                    >
                                        Editează
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeBreadcrumb === 2 && (
                    <div className={styles.billing}>
                        <input type="checkbox" checked={sameAddress}
                            onChange={(e) => setSameAddress(e.target.checked)}
                            style={{
                                color: "#b06f2a",
                                // "&.Mui-checked": {
                                // color: "#b06f2a",
                                // },
                            }}>
                        </input>
                        <p>Adresa de facturare este aceeași</p>
                    </div>
                )}

                {!sameAddress && activeBreadcrumb === 2 && (
                    <BillingAddress
                        setBilling={handleBillingChange}
                        sameAddress={sameAddress}
                        isSubmitting={isSubmitting}
                        setHasErrors={setHasErrors}
                        deliveryAddress={formState}
                    />
                )}

                {activeBreadcrumb === 3 && (
                    <div className={styles.payment}>
                        <p className={styles.label}>Metoda de plată</p>
                        <p className={styles.secured}>
                            Toate tranzacțiile sunt securizate și encriptate.
                        </p>
                        <div className={styles.choose_method}>
                            <div className={styles.each_method}>
                                <label >
                                    <input
                                        type="checkbox"
                                        id='card'
                                        value={paymentMethod}
                                        checked={paymentMethod === 'Card'}
                                        style={{
                                            color: "#b06f2a",
                                            // "&.Mui-checked": {
                                            // color: "#b06f2a",
                                            // },
                                        }}
                                        onChange={() => setPaymentMethod('Card')}
                                    />
                                    Credit Card
                                </label>
                                <div className={styles.netopia}>
                                    <Image
                                        alt="NETOPIA Payments"
                                        src="/netopia.svg"
                                        width={75}
                                        height={100}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className={styles.each_method}>
                                <label>
                                    <input type="checkbox"
                                        value={paymentMethod}
                                        checked={paymentMethod === 'Transfer'}
                                        style={{
                                            color: "#b06f2a",
                                            // "&.Mui-checked": {
                                            // color: "#b06f2a",
                                            // },
                                        }}
                                        onChange={() =>
                                            setPaymentMethod('Transfer')
                                        }
                                    />
                                    Transfer bancar

                                </label>
                            </div>
                            <div className={styles.each_method}>
                                <label>
                                    <input type="checkbox"
                                        value={paymentMethod}
                                        checked={paymentMethod === 'Cash'}
                                        style={{
                                            color: "#b06f2a",
                                            // "&.Mui-checked": {
                                            // color: "#b06f2a",
                                            // },
                                        }}
                                        onChange={() => setPaymentMethod('Cash')}
                                    />
                                    Plata la livrare
                                </label>

                                {/* <CurrencyExchangeIcon className={styles.svg} /> */}
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.bottomForm}>
                    {activeBreadcrumb === 1 ? (
                        <Link href="/cart" className={styles.editCart}>
                            {/* <NavigateBeforeIcon /> */}
                            <p> Editează coșul</p>
                        </Link>
                    ) : activeBreadcrumb === 2 ? (
                        <Link href="/cart" className={styles.editCart}>
                            {/* <NavigateBeforeIcon /> */}
                            <p> Editează coșul</p>
                        </Link>
                    ) : (
                        <div className={styles.editCart}>
                            {/* <NavigateBeforeIcon /> */}
                            <p
                                onClick={() => {
                                    setDisplayPayment(false);
                                    setIsSubmitting(false);
                                    setActiveBreadcrumb(2);
                                }}
                            >
                                Editează adresa
                            </p>
                        </div>
                    )}

                    {activeBreadcrumb === 3 ? (
                        <>
                            <button
                                className={styles.continueBTN}
                                onClick={() => placeOrder()}
                                disabled={loadingOrder}
                            // startIcon={
                            //     loadingOrder ? (
                            //         <CircularProgress size={20} color="inherit" />
                            //     ) : (
                            //         ""
                            //     )
                            // }
                            >
                                Plasează comanda
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.continueBTN}
                                onClick={() => {
                                    setCheckForErrors(true);
                                }}
                            >
                                {activeBreadcrumb === 2 ? "Continuă spre plată" : "Continuă"}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.right}>
                {cartItems.map((item: CartItemsModel) => {
                    return (
                        <div className={styles.item} key={item.id}>
                            <div className={styles.details}>
                                <div className={styles.imgBox}>
                                    <Image
                                        src={item?.products?.images ? getImage(item.products.images[0]) : "/empty_cart.svg"}
                                        alt={item.products.title ?? ''}
                                        className={styles.picture}
                                        // loader={imageKitLoader}
                                        width={80}
                                        height={60}
                                    />
                                    <span className={styles.qty}>{item.quantity}</span>
                                </div>
                                <div className={styles.titleBox}>
                                    <p className={styles.title}>{item.products.title}</p>
                                    <span className={styles.size}>
                                        {ConvertSizeToLabel(item.size_type)}
                                    </span>
                                </div>
                            </div>
                            <p className={styles.price}>{`${Number(item.products.price_kg) * Number(item.quantity)
                                } lei`}</p>
                        </div>
                    );
                })}
                <div className={styles.totalBox}>
                    <p className={styles.title}>Subtotal</p>
                    <p className={styles.price}>
                        {TotalPrice(cartItems)} lei
                    </p>
                </div>
                <div className={styles.shipping}>
                    <p className={styles.title}>Cost Livrare</p>
                    {TotalPrice(cartItems) < 200 ? 15 : 0} lei
                </div>
                <div className={styles.totalPrice}>
                    <p className={styles.title}>Total</p>
                    <p className={styles.price}>
                        {priceWithDelivery()} lei
                    </p>
                </div>
            </div>
        </div>
    );
};


export default Checkout