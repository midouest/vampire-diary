import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "auth/slice";
import { promptGroupSlice } from "prompt-group/slice";
import { vampireSlice } from "vampire/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    promptGroup: promptGroupSlice.reducer,
    vampire: vampireSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
