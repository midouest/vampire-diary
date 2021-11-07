import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import { CreateMemoryFormData, Memory, UpdateMemoryFormData } from "./model";

export const {
  adapter: memoryAdapter,
  query: queryMemorys,
  create: createMemory,
  retrieve: retrieveMemory,
  update: updateMemory,
  remove: removeMemory,
  slice: memorySlice,
} = createCrudApiSlice<Memory, CreateMemoryFormData, UpdateMemoryFormData>({
  name: "memory",
  baseUrl: "/api/v1/game/memorys/",
});

export const memorySelectors = memoryAdapter.getSelectors<RootState>(
  (state) => state.memory
);
