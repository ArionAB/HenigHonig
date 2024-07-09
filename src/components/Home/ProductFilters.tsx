import { FC } from "react";

import styles from "@/styles/productFilters.module.scss";
import { usePageWidth } from "../../../utils/hooks/usePageWidth";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";

export const ProductFilters: FC<{
    setFilteredProducts: Function;
    filteredProducts: number[];
    mobile: boolean;
}> = ({ setFilteredProducts, filteredProducts, mobile }) => {
    const handleFilter = (value: number, e: any) => {
        if (e.target.checked) {
            setFilteredProducts([...filteredProducts, value]);
        } else {
            setFilteredProducts(filteredProducts.filter((item) => item !== value));
        }
    };
    const width = usePageWidth();
    console.log('width', width)

    return (
        <div
            className={styles.container}
            aria-hidden={mobile}
        // style={
        //     mobile
        //         ? { display: "block" }
        //         : !mobile && width > 900
        //             ? { display: "block" }
        //             : { display: "none !important" }
        // }
        >
            {fruitItems.sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }).map((item) => {
                return (
                    <label className={styles.form_control}>
                        <input type="checkbox" name="checkbox" data-active="true" />
                        {item}
                    </label>
                    // <label className={styles.label} key={item}>
                    //     <p>{item}</p>
                    //     <input type="checkbox" className={styles.checkbox} />
                    // </label>
                    //   <FormControlLabel
                    //     key={item.value}
                    //     className={styles.label}
                    //     control={
                    //       <Checkbox
                    //         sx={{
                    //           color: "#344660",
                    //           "&.Mui-checked": {
                    //             color: "#344660",
                    //           },
                    //         }}
                    //         defaultChecked={filteredProducts.includes(item.value)}
                    //       />
                    //     }
                    //     label={item.label}
                    //     onClick={(e) => handleFilter(item.value, e)}
                    //   />
                );
            })}
        </div>
    );
};
