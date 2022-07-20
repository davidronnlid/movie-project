import { configureStore } from '@reduxjs/toolkit'

import moviesReducer from './moviesSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
})

export default store

// Below solution is based on https://redux-toolkit.js.org/tutorials/typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
