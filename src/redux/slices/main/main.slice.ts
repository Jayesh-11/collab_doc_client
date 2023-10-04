import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface MainState {
  value: number
}

const initialState: MainState = {
  value: 0,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { incrementByAmount } = mainSlice.actions
export default mainSlice.reducer