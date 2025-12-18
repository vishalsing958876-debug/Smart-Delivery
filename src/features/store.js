import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import orderReducer from './orderSlice'
import driverReducer from './driverSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
    driver: driverReducer,
    admin: adminReducer,
  },
})

