
import { createClient } from '@/utils/supabase/server';
import { cookies } from "next/headers";
import ItemDetails from '@/components/ProductDetailsPage/itemDetails';
import { Metadata } from 'next';

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let { data: item, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params?.productDetails)

    return {
        title: item[0]!.title!,
        description: item[0].description
    }
}


export default async function ProductDetails({
    params,
}: {
    params: { productDetails: string };
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let { data: item, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params?.productDetails)

    return (
        <>
            <ItemDetails item={item[0]} />
        </>)
}