'use client'

import React, { FC, useEffect, useState } from "react";
import styles from "@/styles/checkout.module.scss"
import { useAppSelector } from "@/Store/hooks";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { EmailRegex } from "../../utils/Functions/EmailRegex";
import { countyitems } from "@/Store/Models/SelectItems/countyitems";

const ShippingAddress: FC<{
    setHasErrors: Function;
    setFormState: Function;
    setFormProp: Function;
    checkForErrors: boolean;
    setCheckForErrors: Function;
    formState: any;
}> = ({
    setHasErrors,
    setFormProp,
    formState,
    setFormState,
    checkForErrors,
    setCheckForErrors,
}) => {
        const currentUser = useAppSelector(selectCurrentUser);
        const [errors, setErrors] = useState<any>({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            county: "",
            city: "",
            phone: "",
        });
        console.log(errors)
        useEffect(() => {
            if (currentUser) {
                setFormState({
                    first_name: currentUser?.profile?.first_name ?? "",
                    last_name: currentUser?.profile?.last_name ?? "",
                    email: currentUser?.profile?.email ?? "",
                    address: currentUser?.profile?.address ?? "",
                    info: currentUser?.profile?.info ?? "",
                    zip_code: currentUser?.profile?.zip_code ?? null,
                    city: currentUser?.profile?.city ?? "",
                    county: currentUser?.profile?.county ?? "Alba",
                    phone: currentUser?.profile?.phone ?? "",
                });
            } else {
                const shippingAddress = localStorage.getItem("shipping")
                    ? JSON.parse(localStorage.getItem("shipping")!)
                    : null;
                if (shippingAddress) {
                    setFormState({
                        first_name: shippingAddress?.first_name ?? "",
                        last_name: shippingAddress?.last_name ?? "",
                        email: shippingAddress?.email ?? "",
                        address: shippingAddress?.address ?? "",
                        info: shippingAddress?.info ?? "",
                        zip_code: shippingAddress?.zip_code ?? null,
                        city: shippingAddress?.city ?? "",
                        county: shippingAddress?.county ?? "",
                        phone: shippingAddress?.phone ?? "",
                    });
                }
            }

            //eslint-disable-next-line
        }, [currentUser]);

        useEffect(() => {
            if (!checkForErrors) return;
            console.log('formState', formState)

            let isError = false;
            const errors = {
                first_name: "",
                last_name: "",
                email: "",
                address: "",
                county: "",
                city: "",
                phone: "",
            };
            console.log(formState)
            if (formState.first_name === "") {
                errors.first_name = "Numele este obligatoriu";
                isError = true;
            }
            if (formState.last_name === "") {
                errors.last_name = "Prenumele este obligatoriu";
                isError = true;
            }
            if (!EmailRegex(formState.email)) {
                errors.email = "Email-ul este invalid";
                isError = true;
            }
            if (formState.address === "") {
                errors.address = "Adresa este obligatorie";
                isError = true;
            }
            if (formState.city === "") {
                errors.city = "Localitatea este obligatorie";
                isError = true;
            }
            if (formState.county === "") {
                errors.county = "Județul este obligatoriu";
                isError = true;
            }
            if (formState.phone === "") {
                errors.phone = "Numărul de telefon este obligatoriu";
                isError = true;
            }
            if (formState.phone.length < 10) {
                errors.phone = "Numărul de telefon este invalid";

                isError = true;
            }

            setErrors(errors);

            setHasErrors(isError);

            setCheckForErrors(false);

            //eslint-disable-next-line
        }, [setHasErrors, checkForErrors]);

        const handleChange = (
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            const { name, value } = e.target;
            setFormProp(name)(value);
            setErrors({ ...errors, [e.target.name]: "" });
        };

        return (
            <form className={styles.form}>
                <p>Adresă de livrare</p>
                <div className={styles.nameContainer}>
                    <label>Nume *
                        <input name="last_name" value={formState.last_name}
                            onChange={(e) => handleChange(e)}
                            required
                            className={styles.textfield}>
                        </input>
                        {errors.first_name && (<span>{errors.first_name}</span>)}
                    </label>
                    <label> Prenume *
                        <input name="first_name"
                            value={formState.first_name}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}>
                        </input>
                        {errors.last_name && (<span>{errors.last_name}</span>)}
                    </label>
                </div>
                <div className={styles.inputContainer}>
                    <label>Email *
                        <input type="email" name="email"
                            value={formState.email}
                            onChange={(e) => handleChange(e)}
                            className={styles.textfield}
                        ></input>
                        {errors.email && (<span>{errors.email}</span>)}
                    </label>

                </div>
                <div className={styles.inputContainer}>
                    <label>Stradă și număr *
                        <input
                            name="address"
                            value={formState.address}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        {errors.address && (<span>{errors.address}</span>)}
                    </label>

                </div>
                <div className={styles.inputContainer}>
                    <label>Informații suplimentare
                        <input
                            name="info"
                            value={formState.info}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </label>
                </div>
                <div className={styles.nameContainer}>
                    <label>Cod poștal
                        <input name="zip_code" value={formState.zip_code}
                            onChange={(e) => handleChange(e)}
                            className={styles.textfield}>
                        </input>
                    </label>
                    <label> Județ *
                        <select name="county"
                            value={formState.county}
                            defaultValue={'Alba' ?? 1}
                            onChange={(e: any) => handleChange(e)}
                            className={styles.textfield}>
                            {
                                countyitems.map((item) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    )
                                })
                            }

                        </select>
                    </label>
                </div>
                <div className={styles.inputContainer}>
                    <label>Localitate *
                        <input
                            required
                            name="city"
                            value={formState.city}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        {errors.city && (<span>{errors.city}</span>)}
                    </label>
                </div>
                <div className={styles.inputContainer}>
                    <label>Telefon *
                        <input
                            required
                            name="phone"
                            value={formState.phone}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        {errors.phone && (<span>{errors.phone}</span>)}
                    </label>
                </div>
            </form>
        );
    };

export default ShippingAddress;
