import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import {
  CreateVampireFormData,
  UpdateVampireFormData,
  Vampire,
} from "./vampire-model";

export const {
  adapter: vampireAdapter,
  query: queryVampires,
  create: createVampire,
  retrieve: retrieveVampire,
  update: updateVampire,
  remove: removeVampire,
  slice: vampireSlice,
} = createCrudApiSlice<Vampire, CreateVampireFormData, UpdateVampireFormData>({
  name: "vampire",
  baseUrl: "/api/v1/game/vampires/",
});

export const vampireSelectors = vampireAdapter.getSelectors<RootState>(
  (state) => state.vampire
);
