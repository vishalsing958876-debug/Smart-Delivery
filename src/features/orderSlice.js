import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  mockCreateOrder,
  mockFetchOrders,
  mockPriceEstimate,
  mockTrackOrder,
} from '../mock/mockApi'

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  estimate: null,
  tracking: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, thunkAPI) => {
  try {
    return await mockFetchOrders()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const createOrder = createAsyncThunk('orders/create', async (payload, thunkAPI) => {
  try {
    return await mockCreateOrder(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const estimatePrice = createAsyncThunk('orders/estimate', async (payload, thunkAPI) => {
  try {
    return await mockPriceEstimate(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const trackOrder = createAsyncThunk('orders/track', async (orderId, thunkAPI) => {
  try {
    return await mockTrackOrder(orderId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list]
      })
      .addCase(estimatePrice.fulfilled, (state, action) => {
        state.estimate = action.payload
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.tracking = action.payload
      })
  },
})

export default orderSlice.reducer

