import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
  roomId: string | null
}

const initialState: ChatState = {
  roomId: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload
    },
  },
})

export const {
  setRoomId
} = chatSlice.actions

export default chatSlice.reducer