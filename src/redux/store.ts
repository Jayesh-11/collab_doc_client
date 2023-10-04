import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './slices/main/main.slice'
import homeReducer from './slices/homepage/homepage.slice'
import chatReducer from './slices/chat/chat.slice'

export const store = configureStore({
  reducer: {
    main: mainReducer,
    home: homeReducer,
    chat: chatReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch