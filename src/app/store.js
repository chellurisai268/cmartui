import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import loginReducer from '../features/users/loginSlice'
import { authenticationApi } from '../services/authenticationApi'
import { productApi } from '../services/productApi'
import cartReducer from '../features/common/cartSlice'
import { orderApi } from '../services/orderApi'

export const store = configureStore({
  reducer: {
    auth : loginReducer,
    cart : cartReducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware,productApi.middleware,orderApi.middleware),
})

setupListeners(store.dispatch)