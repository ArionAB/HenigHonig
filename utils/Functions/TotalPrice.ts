import { CartItemsModel } from "../../src/Store/Models/Cart/CartItemsModel";

export const TotalPrice = (cartItems: CartItemsModel[]) => {
    if (!cartItems || cartItems.length === 0) {
        return 0;
    }
    const items = cartItems?.reduce(
        (acc, item) =>
            acc +
            (item.size_type === 'Big'
                ? Number(item.products.price_kg) * Number(item.quantity)
                : Number(item.products.price_half) * Number(item.quantity)),
        0
    );
    return items;
};
