import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { BaseEntity } from "common/entity";
import { CrudThunk } from "common/thunk";
import { Vampire } from "vampire/vampire-model";
import { updateVampire } from "vampire/vampire-slice";
import {
  Character,
  Event,
  Experience,
  Mark,
  Memory,
  Resource,
  Skill,
} from "./diary-model";
import {
  characterThunk,
  eventThunk,
  experienceThunk,
  markThunk,
  memoryThunk,
  resourceThunk,
  retrieveDeepVampire,
  skillThunk,
} from "./diary-thunk";

const eventAdapter = createEntityAdapter<Event>({
  selectId: (event) => event.id,
});

const memoryAdapter = createEntityAdapter<Memory>({
  selectId: (memory) => memory.id,
});

const experienceAdapter = createEntityAdapter<Experience>({
  selectId: (experience) => experience.id,
});

const skillAdapter = createEntityAdapter<Skill>({
  selectId: (skill) => skill.id,
});

const resourceAdapter = createEntityAdapter<Resource>({
  selectId: (resource) => resource.id,
});

const characterAdapter = createEntityAdapter<Character>({
  selectId: (character) => character.id,
});

const markAdapter = createEntityAdapter<Mark>({
  selectId: (mark) => mark.id,
});

export interface DiaryState {
  vampire: Vampire | undefined;
  event: EntityState<Event>;
  memory: EntityState<Memory>;
  experience: EntityState<Experience>;
  skill: EntityState<Skill>;
  resource: EntityState<Resource>;
  character: EntityState<Character>;
  mark: EntityState<Mark>;
}

export function getInitialDiaryState(): DiaryState {
  return {
    vampire: undefined,
    event: eventAdapter.getInitialState(),
    memory: memoryAdapter.getInitialState(),
    experience: experienceAdapter.getInitialState(),
    skill: skillAdapter.getInitialState(),
    resource: resourceAdapter.getInitialState(),
    character: characterAdapter.getInitialState(),
    mark: markAdapter.getInitialState(),
  };
}

function registerCrudThunk<Entity extends BaseEntity>(
  builder: ActionReducerMapBuilder<DiaryState>,
  getState: (state: DiaryState) => EntityState<Entity>,
  adapter: EntityAdapter<Entity>,
  crudThunk: CrudThunk<Entity, any, any>
): ActionReducerMapBuilder<DiaryState> {
  return builder
    .addCase(crudThunk.create.fulfilled, (state, action) => {
      const entityState = getState(state);
      adapter.addOne(entityState, action.payload);
    })
    .addCase(crudThunk.update.fulfilled, (state, action) => {
      const entityState = getState(state);
      adapter.upsertOne(entityState, action.payload);
    })
    .addCase(crudThunk.remove.fulfilled, (state, action) => {
      const entityState = getState(state);
      adapter.removeOne(entityState, action.payload);
    });
}

export const diarySlice = createSlice({
  name: "diary",
  initialState: getInitialDiaryState(),
  reducers: {},
  extraReducers: (builder) => {
    let diaryBuilder = builder.addCase(
      retrieveDeepVampire.fulfilled,
      (state, action) => {
        const deepVampire = action.payload;

        state.vampire = {
          id: deepVampire.id,
          name: deepVampire.name,
          description: deepVampire.description,
        };

        eventAdapter.setAll(state.event, deepVampire.events);
        memoryAdapter.setAll(state.memory, deepVampire.memories);
        experienceAdapter.setAll(state.experience, deepVampire.experiences);
        skillAdapter.setAll(state.skill, deepVampire.skills);
        resourceAdapter.setAll(state.resource, deepVampire.resources);
        characterAdapter.setAll(state.character, deepVampire.characters);
        markAdapter.setAll(state.mark, deepVampire.marks);
      }
    );

    diaryBuilder = diaryBuilder.addCase(
      updateVampire.fulfilled,
      (state, action) => {
        state.vampire = action.payload;
      }
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.event,
      eventAdapter,
      eventThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.memory,
      memoryAdapter,
      memoryThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.experience,
      experienceAdapter,
      experienceThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.skill,
      skillAdapter,
      skillThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.resource,
      resourceAdapter,
      resourceThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.character,
      characterAdapter,
      characterThunk
    );

    diaryBuilder = registerCrudThunk(
      diaryBuilder,
      (state) => state.mark,
      markAdapter,
      markThunk
    );

    return diaryBuilder;
  },
});

export const selectVampire = (state: RootState) => state.diary.vampire;

export const memorySelectors = memoryAdapter.getSelectors(
  (state: RootState) => state.diary.memory
);

export const experienceSelectors = experienceAdapter.getSelectors(
  (state: RootState) => state.diary.experience
);

export const skillSelectors = skillAdapter.getSelectors(
  (state: RootState) => state.diary.skill
);

export const resourceSelectors = resourceAdapter.getSelectors(
  (state: RootState) => state.diary.resource
);

export const characterSelectors = characterAdapter.getSelectors(
  (state: RootState) => state.diary.character
);

export const markSelectors = markAdapter.getSelectors(
  (state: RootState) => state.diary.mark
);
