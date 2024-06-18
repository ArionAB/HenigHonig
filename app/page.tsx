import { cookies } from 'next/headers';

import styles from "@/styles/home.module.scss"
import { createClient } from '../utils/supabase/server';
import Card from '@/components/Card/Card';
import Hero from '@/components/Home/Hero';
import ProductItems from '@/components/Home/ProductItems';

export default async function index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase.from('products').select("*");

    if (error) throw error;

    return (
        <div className={styles.homeContainer}>
            <Hero />
            <div className={styles.cardContainer}>
                <ProductItems productItems={products} />
                {/* {products?.map((product, index) => (
                    <Card key={product.id} item={product} index={index} />
                ))} */}
            </div>
        </div>
    );
}