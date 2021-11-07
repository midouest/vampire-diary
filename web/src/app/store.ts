import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "auth/slice";
import { characterSlice } from "character/slice";
import { eventSlice } from "event/slice";
import { experienceSlice } from "experience/slice";
import { markSlice } from "mark/slice";
import { memorySlice } from "memory/slice";
import { promptGroupSlice } from "prompt-group/slice";
import { promptSlice } from "prompt/slice";
import { resourceSlice } from "resource/slice";
import { skillSlice } from "skill/slice";
import { vampireSlice } from "vampire/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    promptGroup: promptGroupSlice.reducer,
    prompt: promptSlice.reducer,
    vampire: vampireSlice.reducer,
    event: eventSlice.reducer,
    memory: memorySlice.reducer,
    experience: experienceSlice.reducer,
    skill: skillSlice.reducer,
    resource: resourceSlice.reducer,
    character: characterSlice.reducer,
    mark: markSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
