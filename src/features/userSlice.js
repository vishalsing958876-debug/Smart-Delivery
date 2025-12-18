import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  mockFetchChat,
  mockFetchRecentOrders,
  mockLogin,
  mockSendMessage,
  mockSignup,
} from '../mock/mockApi'

const initialState = {
  currentUser: null,
  status: 'idle',
  error: null,
  recentDeliveries: [],
  messages: [],
}

export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    return await mockLogin(credentials)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const signupUser = createAsyncThunk('user/signup', async (payload, thunkAPI) => {
  try {
    return await mockSignup(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const fetchRecentDeliveries = createAsyncThunk(
  'user/recentDeliveries',
  async (customerId, thunkAPI) => {
    try {
      return await mockFetchRecentOrders(customerId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const fetchChatMessages = createAsyncThunk('user/chatFetch', async (_, thunkAPI) => {
  try {
    return await mockFetchChat()
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const sendChatMessage = createAsyncThunk('user/chatSend', async (payload, thunkAPI) => {
  try {
    return await mockSendMessage(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null
      state.recentDeliveries = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchRecentDeliveries.fulfilled, (state, action) => {
        state.recentDeliveries = action.payload
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload]
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer

