import { Enums, Tables } from "../Database";

export interface CartModel {
    created_at: string | null,
    date_email_sent: string | null,
    emails_sent: number | null,
    id: string,
    modified_at: string | null
    cart_products: {
        created_at: string
        id: string
        mixed_fruit_id: Enums<'fruit_type'>[]
        product_id: string | null
        quantity: number | null
        size_type: Enums<'size_type'>
        user_id: string | null
        fruit_type: Enums<'fruit_type'>;
        products: Tables<'products'>[]
    }[]
}