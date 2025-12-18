import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockAssignDriver, mockFetchAdminOverview } from '../mock/mockApi'

const initialState = {
  metrics: {
    totalUsers: 0,
    totalDrivers: 0,
    activeOrders: 0,
    earnings: 0,
  },
  users: [],
  drivers: [],
  orders: [],
  assignModal: {
    open: false,
    orderId: null,
  },
  status: 'idle',
  error: null,
}

export const fetchAdminOverview = createAsyncThunk(
  'admin/overview',
  async (_, thunkAPI) => {
    try {
      return await mockFetchAdminOverview()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const assignDriver = createAsyncThunk('admin/assignDriver', async (payload, thunkAPI) => {
  try {
    return await mockAssignDriver(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    openAssignModal(state, action) {
      state.assignModal = { open: true, orderId: action.payload }
    },
    closeAssignModal(state) {
      state.assignModal = { open: false, orderId: null }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOverview.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdminOverview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { totalUsers, totalDrivers, activeOrders, earnings, users, drivers, orders } =
          action.payload
        state.metrics = { totalUsers, totalDrivers, activeOrders, earnings }
        state.users = users
        state.drivers = drivers
        state.orders = orders
      })
      .addCase(fetchAdminOverview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(assignDriver.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        )
        state.assignModal = { open: false, orderId: null }
      })
  },
})

export const { openAssignModal, closeAssignModal } = adminSlice.actions
export default adminSlice.reducer

