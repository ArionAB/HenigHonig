import { cookies } from 'next/headers';

import styles from "@/src/styles/home.module.scss"
import { createClient } from '../utils/supabase/server';
import Card from '@/components/Card/Card';

export default async function index() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase.from('products').select("*");

    if (error) throw error;

    return (
        <div className={styles.cardContainer}>
            {products?.map((product, index) => (
                <Card key={product.id} item={product} index={index} />

            ))}
        </div>
    );
}