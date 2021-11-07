import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "auth/slice";
import { fullVampireSlice } from "diary/full-vampire-slice";
import { promptGroupSlice } from "vampire/prompt-group-slice";
import { vampireSlice } from "vampire/vampire-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    promptGroup: promptGroupSlice.reducer,
    vampire: vampireSlice.reducer,
    fullVampire: fullVampireSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
