import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import {
  Character,
  CreateCharacterFormData,
  UpdateCharacterFormData,
} from "./model";

export const {
  adapter: characterAdapter,
  query: queryCharacters,
  create: createCharacter,
  retrieve: retrieveCharacter,
  update: updateCharacter,
  remove: removeCharacter,
  slice: characterSlice,
} = createCrudApiSlice<
  Character,
  CreateCharacterFormData,
  UpdateCharacterFormData
>({
  name: "character",
  baseUrl: "/api/v1/game/characters/",
});

export const vampireSelectors = characterAdapter.getSelectors<RootState>(
  (state) => state.character
);
