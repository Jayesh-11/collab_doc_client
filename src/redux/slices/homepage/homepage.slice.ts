import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FriendsList {
  roomId: string,
  name: string,
  friendFirebaseUserId: string,
}

interface HomeState {
  rightDrawerVisible: boolean,
  friendsList: Array<FriendsList>,
}

const initialState: HomeState = {
  rightDrawerVisible: false,
  friendsList: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setRightDrawerVisible: (state, action: PayloadAction<boolean>) => {
      state.rightDrawerVisible = action.payload
    },
    setFriendsList: (state, action: PayloadAction<Array<FriendsList>>) => {
      state.friendsList = action.payload
    }
  },
})

export const {
  setRightDrawerVisible,
  setFriendsList
} = homeSlice.actions

export default homeSlice.reducer