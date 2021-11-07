import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import { CreateMarkFormData, Mark, UpdateMarkFormData } from "./model";

export const {
  adapter: markAdapter,
  query: queryMarks,
  create: createMark,
  retrieve: retrieveMark,
  update: updateMark,
  remove: removeMark,
  slice: markSlice,
} = createCrudApiSlice<Mark, CreateMarkFormData, UpdateMarkFormData>({
  name: "mark",
  baseUrl: "/api/v1/game/marks/",
});

export const markSelectors = markAdapter.getSelectors<RootState>(
  (state) => state.mark
);
