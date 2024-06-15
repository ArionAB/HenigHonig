import { OrderModel } from "../Models/Order/OrderModel";
import { RootState } from "../store";

export const selectUserOrders = (state: RootState): OrderModel[] => {
    return state.order.userOrders;
};

