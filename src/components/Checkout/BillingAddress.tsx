'use client'
import { FC, useState, useEffect } from "react";
import styles from "@/styles/checkout.module.scss"
import { useFormState } from "../../utils/hooks/useReactForm";
import { useAppSelector } from "@/Store/hooks";
import { selectCurrentUser } from "@/Store/selectors/authSelectors";
import { countyitems } from "@/Store/Models/SelectItems/countyitems";

const BillingAddress: FC<{
    setBilling: Function;
    sameAddress: boolean;
    isSubmitting: boolean;
    setHasErrors: Function;
    deliveryAddress: any;
}> = ({
    setBilling,
    sameAddress,
    isSubmitting,
    setHasErrors,
    deliveryAddress,
}) => {
        const [formState, setFormProp, setFormState] = useFormState({
            first_name_bill: "",
            last_name_bill: "",
            address_bill: "",
            info_bill: "",
            zip_code_bill: 0,
            city_bill: "",
            county_bill: "",
        });
        const [errors, setErrors] = useState({
            first_name_bill: "",
            last_name_bill: "",
            address_bill: "",
            city_bill: "",
            county_bill: "",
        });

        const currentUser = useAppSelector(selectCurrentUser);

        useEffect(() => {
            if (currentUser) {
                setFormState({
                    first_name_bill: currentUser?.profile.first_name_bill ?? "",
                    last_name_bill: currentUser?.profile.last_name_bill ?? "",
                    address_bill: currentUser?.profile.address_bill ?? "",
                    info_bill: currentUser?.profile.info_bill ?? "",
                    zip_code_bill: Number(currentUser?.profile.zip_code_bill) ?? "",
                    city_bill: currentUser?.profile.city_bill ?? "",
                    county_bill: currentUser?.profile.county_bill ?? "",
                });
            } else {
                const shippingAddress = localStorage.getItem("billing")
                    ? JSON.parse(localStorage.getItem("billing")!)
                    : null;
                if (shippingAddress) {
                    setFormState({
                        first_name_bill: shippingAddress?.first_name_bill || "",
                        last_name_bill: shippingAddress?.last_name_bill || "",
                        address_bill: shippingAddress?.address_bill || "",
                        info_bill: shippingAddress?.info_bill || "",
                        zip_code_bill: shippingAddress?.zip_code_bill || "",
                        city_bill: shippingAddress?.city_bill || "",
                        county_bill: shippingAddress?.county_bill || "",
                    });
                }
            }

            //eslint-disable-next-line
        }, [currentUser]);

        const handleChange = (
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
            const { name, value } = e.target;
            //@ts-ignore
            setFormProp(name)(value);
            setErrors({ ...errors, [e.target.name]: "" });
        };

        useEffect(() => {
            if (!isSubmitting) return;
            let isError = false;
            const errors = {
                first_name_bill: "",
                last_name_bill: "",
                address_bill: "",
                city_bill: "",
                county_bill: "",
            };

            if (formState.first_name_bill === "") {
                errors.first_name_bill = "Numele este obligatoriu";
                isError = true;
            }
            if (formState.last_name_bill === "") {
                errors.last_name_bill = "Prenumele este obligatoriu";
                isError = true;
            }

            if (formState.address_bill === "") {
                errors.address_bill = "Adresa este obligatorie";
                isError = true;
            }
            if (formState.city_bill === "") {
                errors.city_bill = "Localitatea este obligatorie";
                isError = true;
            }
            if (formState.county_bill === "") {
                errors.county_bill = "Județul este obligatoriu";
                isError = true;
            }

            setErrors(errors);
            setHasErrors(isError);
        }, [isSubmitting, formState, setHasErrors]);

        useEffect(() => {
            setBilling(formState);

            //eslint-disable-next-line
        }, [formState]);

        useEffect(() => {
            if (!sameAddress) {
                setErrors({
                    first_name_bill: "",
                    last_name_bill: "",
                    address_bill: "",
                    city_bill: "",
                    county_bill: "",
                });
                setFormState({
                    first_name_bill: deliveryAddress.first_name,
                    last_name_bill: deliveryAddress.last_name,
                    address_bill: deliveryAddress.address,
                    info_bill: deliveryAddress.info,
                    zip_code_bill: deliveryAddress.zip_code,
                    city_bill: deliveryAddress.city,
                    county_bill: deliveryAddress.county,
                });
            }

            //eslint-disable-next-line
        }, [sameAddress]);

        return (
            <form className={styles.form}>
                <p>Adresă de facturare</p>
                <div >

                    {/* <TextField
                            required
                            label="Nume"
                            InputProps={{
                                classes: {
                                    root: styles.cssOutlinedInput,
                                    focused: styles.cssFocused,
                                    notchedOutline: styles.notchedOutline,
                                },
                                inputMode: "numeric",
                            }}
                            name="last_name_bill"
                            value={formState.last_name_bill}
                            onChange={(e) => handleChange(e)}
                            className={styles.textfield}
                            error={errors.last_name_bill ? true : false}
                            helperText={errors.last_name_bill && errors.last_name_bill}
                        ></TextField> */}
                    <div className={styles.nameContainer}>
                        <label>Nume
                            <input name="last_name_bill" value={formState.last_name_bill}
                                onChange={(e) => handleChange(e)}
                                className={styles.textfield}>
                            </input>
                        </label>
                        <label> Prenume *
                            <input name="first_name_bill"
                                value={formState.first_name_bill}
                                className={styles.textfield}
                                onChange={(e) => handleChange(e)}>
                            </input>
                            {/* {formState.first_name} */}
                        </label>

                        {/* <TextField
                            required
                            label="Prenume"
                            className={styles.textfield}
                            InputProps={{
                                classes: {
                                    root: styles.cssOutlinedInput,
                                    focused: styles.cssFocused,
                                    notchedOutline: styles.notchedOutline,
                                },
                                inputMode: "numeric",
                            }}
                            name="first_name_bill"
                            value={formState.first_name_bill}
                            onChange={(e) => handleChange(e)}
                            error={errors.first_name_bill ? true : false}
                            helperText={errors.first_name_bill && errors.first_name_bill}
                        >
                            {formState.first_name_bill}
                        </TextField> */}
                    </div>
                </div>
                {/*             <div item xs={12}>
                    <TextField
                        required
                        label="Stradă și număr"
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            },
                            inputMode: "numeric",
                        }}
                        name="address_bill"
                        value={formState.address_bill}
                        className={styles.textfield}
                        onChange={(e) => handleChange(e)}
                        error={errors.address_bill ? true : false}
                        helperText={errors.address_bill && errors.address_bill}
                    >

                    </TextField>
                </div> */}
                <div className={styles.inputContainer}>
                    <label>Stradă și număr
                        <input
                            name="address_bill"
                            value={formState.address_bill}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </label>

                </div>
                {/*    <div item xs={12}>
                    <TextField
                        label="Informații suplimentare"
                        InputProps={{
                            classes: {
                                root: styles.cssOutlinedInput,
                                focused: styles.cssFocused,
                                notchedOutline: styles.notchedOutline,
                            },
                            inputMode: "numeric",
                        }}
                        name="info_bill"
                        value={formState.info_bill}
                        className={styles.textfield}
                        onChange={(e) => handleChange(e)}
                    ></TextField>
                </div> */}
                <div className={styles.inputContainer}>
                    <label>Informații suplimentare
                        <input
                            name="info_bill"
                            value={formState.info_bill}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </label>
                </div>
                <div className={styles.nameContainer}>
                    <label>Cod poștal
                        <input name="zip_code_bill" value={formState.zip_code_bill}
                            onChange={(e) => handleChange(e)}
                            className={styles.textfield}>
                        </input>
                    </label>
                    <label> Județ *
                        <select name="county"
                            value={formState.county_bill}
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
                            value={formState.city_bill}
                            className={styles.textfield}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        {errors.city_bill && (<span>{errors.city_bill}</span>)}
                    </label>
                </div>

            </form>
        );
    };

export default BillingAddress;
