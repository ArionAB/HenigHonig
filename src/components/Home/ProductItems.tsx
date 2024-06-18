'use client'

import React, { useState, useEffect, useRef, FC } from "react";


import styles from "@/styles/productItems.module.scss";

import { ProductFilters } from "./ProductFilters";
import { Enums, Tables } from "@/Store/Models/Database";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import Card from "../Card/Card";

const ProductItems: FC<{
    productItems: Tables<'products'>[]
}> = ({ productItems }) => {
    const boxRef = useRef<any>(null);
    const containerRef = useRef(null);

    const [honeyType, setHoneyType] = useState<Enums<'product_type'>>('All');
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isInViewport, setIsInViewport] = useState(true);
    const [endOfContainer, setEndOfContainer] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<number[]>([]);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    //   const productItems = useAppSelector(selectProductItems);
    //   const loadingItems = useAppSelector(selectLoadingItems);

    //   useEffect(() => {
    //     setIsMounted(true);
    //     if (isMounted && !productItems.length) {
    //       dispatch(getProductItems(""));
    //     }

    //     //eslint-disable-next-line
    //   }, [isMounted]);

    useEffect(() => {
        const containerElement = containerRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.5, // adjust threshold as needed
            }
        );

        const target = boxRef.current;

        if (target) {
            observer.observe(target);
        }

        if (containerElement) {
            observer.observe(containerElement);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }

            if (containerElement) {
                observer.unobserve(containerElement);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 400,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const containerElement = containerRef.current;
            if (containerElement) {
                //@ts-ignore
                const { bottom } = containerElement.getBoundingClientRect();
                const isAtEnd = bottom <= window.innerHeight;

                setEndOfContainer(isAtEnd);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={styles.ProductsContainer}
            ref={containerRef}
        >
            <>
                <div ref={boxRef} className={styles.honeyType}>
                    <h2 className={styles.type}>
                        TIP MIERE
                    </h2>

                    <ul className={styles.selectType}>
                        <li
                            onClick={() => {
                                setHoneyType('All');
                            }}
                            className={
                                honeyType === 'All' ? styles.active : styles.not_active
                            }
                        >
                            Toate
                        </li>
                        <li
                            onClick={() => {
                                setHoneyType('Poliflora');
                            }}
                            className={
                                honeyType === 'Poliflora'
                                    ? styles.active
                                    : styles.not_active
                            }
                        >
                            Polifloră
                        </li>
                        <li
                            onClick={() => {
                                setHoneyType('Salcam');
                            }}
                            className={
                                honeyType === 'Salcam'
                                    ? styles.active
                                    : styles.not_active
                            }
                        >
                            Salcâm
                        </li>
                    </ul>
                </div>

                {/* Conditionally render mobile Box component when isInViewport is true */}
                {!isInViewport && !endOfContainer && (
                    <div className={styles.honeyType_mobile}>
                        <ul className={styles.selectType}>
                            <li
                                onClick={() => {
                                    setHoneyType('All');
                                    scrollToTop();
                                }}
                                className={
                                    honeyType === 'All'
                                        ? styles.active
                                        : styles.not_active
                                }
                            >
                                Toate
                            </li>
                            <li
                                onClick={() => {
                                    setHoneyType('Poliflora');
                                    scrollToTop();
                                }}
                                className={
                                    honeyType === 'Poliflora'
                                        ? styles.active
                                        : styles.not_active
                                }
                            >
                                Polifloră
                            </li>
                            <li
                                onClick={() => {
                                    setHoneyType('Salcam');
                                    scrollToTop();
                                }}
                                className={
                                    honeyType === 'Salcam'
                                        ? styles.active
                                        : styles.not_active
                                }
                            >
                                Salcâm
                            </li>
                        </ul>
                    </div>
                )}
            </>
            <div className={styles.categoryWrapper}>
                <ProductFilters
                    filteredProducts={filteredProducts}
                    setFilteredProducts={setFilteredProducts}
                    mobile={false}
                />
                {(isInViewport || (!isInViewport && !endOfContainer)) && (
                    <button
                        className={styles.drawerBTN}
                        onClick={() => setOpenDrawer(true)}
                    // startIcon={<TuneIcon />}
                    >
                        Filtre
                    </button>
                )}

                {/* <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <div className={styles.filter_title}>
            <Typography variant="h6">Filtre</Typography>
            <Close onClick={() => setOpenDrawer(false)} />
          </Box>

          <ProductFilters
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            mobile={true}
          />
        </Drawer> */}

                <div className={styles.grid_container}>
                    {productItems?.map((card: Tables<'products'>, index: number) => {
                        if (
                            card.product_type === honeyType &&
                            filteredProducts?.includes(Number(card.fruit_type))
                        ) {
                            return <Card item={card} index={index} carousel={false} />;
                        } else if (
                            card.product_type === honeyType &&
                            !filteredProducts.length
                        ) {
                            return <Card item={card} index={index} carousel={false} />;
                        } else if (
                            honeyType === 'All' &&
                            filteredProducts?.includes(Number(card.fruit_type))
                        ) {
                            return <Card item={card} index={index} carousel={false} />;
                        } else if (
                            honeyType === 'All' &&
                            !filteredProducts.length
                        ) {
                            return <Card item={card} index={index} carousel={false} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
export default ProductItems;
