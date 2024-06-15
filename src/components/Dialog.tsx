import React, { ReactNode, FC, useRef, useEffect } from 'react';
import styles from "@/styles/dialog.module.scss";


const Dialog: FC<{
    children: ReactNode,
    closeDialog: Function
}> = ({ children, closeDialog }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
            // Clicked outside the dialog, close the dialog
            closeDialog(false);
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Detach the event listener when the component unmounts
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={styles.dialogContainer} >
            <div className={styles.backdrop} >
                <div className={styles.dialog} >
                    <div className={styles.paper} ref={dialogRef}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
