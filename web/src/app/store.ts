import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "auth/slice";
import { eventSlice } from "diary/event-slice";
import { diarySlice } from "diary/diary-slice";
import { promptGroupSlice } from "vampire/prompt-group-slice";
import { vampireSlice } from "vampire/vampire-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    promptGroup: promptGroupSlice.reducer,
    vampire: vampireSlice.reducer,
    diary: diarySlice.reducer,
    event: eventSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
