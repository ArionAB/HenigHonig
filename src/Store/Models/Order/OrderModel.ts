import { Enums, Tables } from "../Database"

export interface OrderModel {
    created_at: string
    id: string
    status_type: Enums<'status_type'>
    total_price: number
    user_id: string
    orders_products: Tables<'orders_products'>[]
    orders_address: Tables<'orders_address'>[]
}