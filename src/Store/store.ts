import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import AuthSlice from './slices/AuthSlice'
import OrderSlice from './slices/OrderSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: CartSlice,
            auth: AuthSlice,
            order: OrderSlice
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunkConfig = { dispatch: AppDispatch, state: RootState }