import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import socketReducer from "./features/socketSlice";

import socketMiddleware from "./features/socketMiddleware";

export const store = configureStore({
  reducer: {
    authReducer,
    socketReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([socketMiddleware]);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;