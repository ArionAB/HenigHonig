'use client'

import React from 'react'
import { useState } from "react";

import styles from "@/styles/contact.module.scss";
// import { sendContactForm } from "../lib/contact";
// import { emailRegex } from "../src/Utils/Functions/emailRegex";

const Contact = () => {
    const [email, setEmail] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [errors, setErrors] = useState<any>({
        emailError: "",
        commentError: "",
    });

    const handleSendEmail = async () => {
        let hasErrors = false;
        const errors = {
            emailError: "",
            commentError: "",
        };

        if (!email) {
            errors.emailError = "Email-ul este obligatoriu";

            hasErrors = true;
        }
        if (!comment) {
            errors.commentError = "Comentariul este obligatoriu";
            hasErrors = true;
        }
        // if (!emailRegex(email)) {
        //   errors.emailError = "Email-ul nu este valid";
        //   hasErrors = true;
        // }
        if (hasErrors) {
            setErrors(errors);
            return;
        } else
            try {
                // await sendContactForm({ data: { email, comment } });
            } catch (error: any) { }
    };

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.contact}>Contact</p>
                <div className={styles.box}>
                    <p className={styles.title}>Mistral 2</p>
                    <p className={styles.info}>
                        Sediu: Minicipiul Alba Iulia, Str. Luceafarului, nr. 19, Bloc B7,
                        ap.2, județ Alba
                    </p>
                    <p className={styles.info}>CUI: 4973139</p>
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>Punct de lucru:</p>
                    <p className={styles.info}>
                        Str. Mihai Eminescu, nr. 1, Alba Iulia, Alba
                    </p>
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>Contact:</p>
                    <p className={styles.info}>info@henighonig.ro</p>
                    <p className={styles.info}>0741680054</p>
                </div>
                <div className={styles.box}>
                    Suntem disponibili de luni până vineri între orele 8.00-16.30
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>Nr. cont:</p>
                    <p className={styles.info}>Banca Transilvania</p>
                    <p className={styles.info}>
                        IBAN: RO12BTRLRONCRT1234567890123456
                    </p>
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>
                        Urmărește-ne pe rețelele sociale:
                    </p>
                    {/* <Instagram /> */}
                    {/* <Facebook /> */}
                </div>
            </div>
            <div className={styles.askUs}>
                <p className={styles.title}>Întreabă-ne</p>
                <form className={styles.form}>
                    <input
                        // label="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, emailError: "" });
                        }}
                        value={email || ""}
                        className={styles.textfield}
                    // helperText={errors.emailError}
                    // error={errors.emailError ? true : false}
                    // InputProps={{
                    //   classes: {
                    //     root: styles.cssOutlinedInput,
                    //     focused: styles.cssFocused,
                    //     notchedOutline: styles.notchedOutline,
                    //   },
                    // }}
                    />
                    <input
                        // multiline
                        // rows={8}
                        // label="Comentariu"
                        value={comment || ""}
                        onChange={(e) => {
                            setComment(e.target.value);
                            setErrors({ ...errors, commentError: "" });
                        }}
                        className={styles.textfield}
                    // helperText={errors.commentError}
                    // error={errors.commentError ? true : false}
                    // InputProps={{
                    //   classes: {
                    //     root: styles.cssOutlinedInput,
                    //     focused: styles.cssFocused,
                    //     notchedOutline: styles.notchedOutline,
                    //   },
                    // }}
                    />
                    <button onClick={() => handleSendEmail()}>
                        Trimite
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
