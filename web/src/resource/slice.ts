import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import {
  CreateResourceFormData,
  Resource,
  UpdateResourceFormData,
} from "./model";

export const {
  adapter: resourceAdapter,
  query: queryResources,
  create: createResource,
  retrieve: retrieveResource,
  update: updateResource,
  remove: removeResource,
  slice: resourceSlice,
} = createCrudApiSlice<
  Resource,
  CreateResourceFormData,
  UpdateResourceFormData
>({
  name: "resource",
  baseUrl: "/api/v1/game/resources/",
});

export const resourceSelectors = resourceAdapter.getSelectors<RootState>(
  (state) => state.resource
);
