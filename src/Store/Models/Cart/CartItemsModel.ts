import { Enums, Tables } from "../Database"

export interface CartItemsModel {
    created_at: string
    id: string
    mixed_fruit_id: Enums<'fruit_type'>[]
    product_id: string | null
    quantity: number | null
    size_type: Enums<'size_type'>
    user_id: string | null
    fruit_type: Enums<'fruit_type'>;
    products: Tables<'products'>
}