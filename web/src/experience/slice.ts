import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import {
  CreateExperienceFormData,
  Experience,
  UpdateExperienceFormData,
} from "./model";

export const {
  adapter: experienceAdapter,
  query: queryExperiences,
  create: createExperience,
  retrieve: retrieveExperience,
  update: updateExperience,
  remove: removeExperience,
  slice: experienceSlice,
} = createCrudApiSlice<
  Experience,
  CreateExperienceFormData,
  UpdateExperienceFormData
>({
  name: "experience",
  baseUrl: "/api/v1/game/experiences/",
});

export const experienceSelectors = experienceAdapter.getSelectors<RootState>(
  (state) => state.experience
);
