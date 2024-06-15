'use client'


import { useState, FC } from "react";
import styles from '@/styles/addItemForm.module.scss';
import FileUploadComponent from "../FileUpload/FileUpload";
import { Enums, TablesInsert } from "@/Store/Models/Database";
import supabase from "../../utils/supabase/createClient";
import { productItems } from "@/Store/Models/SelectItems/productItems";
import { fruitItems } from "@/Store/Models/SelectItems/fruitItems";
// import FileUploadComponent from "../fileUpload/FileUploadComponent";

const AddItemForm = () => {
    const [formValues, setFormValues] = useState<TablesInsert<'products'>>({
        title: "",
        description: "",
        fruit_type: 'Nothing',
        product_type: 'Poliflora',
        price_kg: null,
        price_half: null,
        in_stock: true,
        images: [],
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const uploadPictures = (newFiles: File[]) => {
        setUploadedImages(newFiles)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const imageUrls: string[] = [];
        for (let file of uploadedImages) {
            let { data, error } = await supabase.storage.from('henig').upload(`${file.name}`, file);
            if (error) throw error;
            imageUrls.push(data!.path);
        }
        formValues.images = imageUrls
        const { data, error } = await supabase
            .from('products')
            .insert([
                formValues
            ])
            .select();


        if (error) {
            alert(error)
        }
    }



    return (
        <div className={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="form-control">
                    <label htmlFor="productCategory">Tip miere</label>
                    <select
                        id="productCategory"
                        value={formValues.product_type}
                        name="productCategory"
                        onChange={(e: any) => setFormValues({ ...formValues, product_type: e.target.value })}
                    >
                        {
                            productItems.map((item: Enums<'product_type'>) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })
                        }


                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="fruitType">Tip Fruct</label>
                    <select
                        id="fruitType"
                        value={formValues.fruit_type}
                        name="fruitType"
                        onChange={(e: any) => setFormValues({ ...formValues, fruit_type: e.target.value })}
                    >
                        {
                            fruitItems.map((item) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="input-label">
                    <label>
                        <h6>Nume</h6>
                        <input type="text" name="title" onChange={(e) => handleChange(e)} />
                    </label>
                </div>

                <div className="input-label">
                    <label>
                        <h6>Descriere</h6>
                        <textarea
                            name="description"
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                    </label>
                </div>

                <div className="input-label">
                    <label>
                        <h6>Pret la KG</h6>
                        <input type="text" name="price_kg" onChange={(e) => handleChange(e)} />
                    </label>
                </div>

                <div className="input-label">
                    <label>
                        <h6>Pret la 500g</h6>
                        <input
                            type="text"
                            name="price_half"
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>

                <h6>Poze</h6>

                {/* Include your FileUploadComponent JSX here */}
                <FileUploadComponent onFilesChange={uploadPictures} />

                <button type="submit">Adaugă produs</button>
            </form>
        </div>
    );
};

export default AddItemForm;