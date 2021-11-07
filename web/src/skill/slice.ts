import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import { CreateSkillFormData, Skill, UpdateSkillFormData } from "./model";

export const {
  adapter: skillAdapter,
  query: querySkills,
  create: createSkill,
  retrieve: retrieveSkill,
  update: updateSkill,
  remove: removeSkill,
  slice: skillSlice,
} = createCrudApiSlice<Skill, CreateSkillFormData, UpdateSkillFormData>({
  name: "skill",
  baseUrl: "/api/v1/game/skills/",
});

export const skillSelectors = skillAdapter.getSelectors<RootState>(
  (state) => state.skill
);
