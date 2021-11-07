import { RootState } from "app/store";
import { createCrudApiSlice } from "common/slice";
import { CreateEventFormData, Event, UpdateEventFormData } from "./event-model";

export const {
  adapter: eventAdapter,
  query: queryEvents,
  create: createEvent,
  retrieve: retrieveEvent,
  update: updateEvent,
  remove: removeEvent,
  slice: eventSlice,
} = createCrudApiSlice<Event, CreateEventFormData, UpdateEventFormData>({
  name: "event",
  baseUrl: "/api/v1/game/events/",
});

export const eventSelectors = eventAdapter.getSelectors(
  (state: RootState) => state.event
);
