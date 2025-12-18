import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  mockDriverLogin,
  mockFetchDriverRequests,
  mockFetchDrivers,
} from '../mock/mockApi'

const initialState = {
  profile: null,
  incoming: [],
  roster: [],
  status: 'idle',
  error: null,
}

export const driverLogin = createAsyncThunk('driver/login', async (payload, thunkAPI) => {
  try {
    return await mockDriverLogin(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const fetchDriverRequests = createAsyncThunk(
  'driver/requests',
  async (_, thunkAPI) => {
    try {
      return await mockFetchDriverRequests()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const fetchDriverRoster = createAsyncThunk('driver/roster', async (_, thunkAPI) => {
  try {
    return await mockFetchDrivers()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(driverLogin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(driverLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(driverLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchDriverRequests.fulfilled, (state, action) => {
        state.incoming = action.payload
      })
      .addCase(fetchDriverRoster.fulfilled, (state, action) => {
        state.roster = action.payload
      })
  },
})

export default driverSlice.reducer

