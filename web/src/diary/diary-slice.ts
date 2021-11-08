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
import { DIARY_MEMORY_CAPACITY } from "./diary-constants";
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
  currentEventIndex: number | undefined;
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
    currentEventIndex: undefined,
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
  reducers: {
    eventStart: (state) => {
      if (state.currentEventIndex === undefined) {
        return;
      }
      state.currentEventIndex = 0;
    },
    eventEnd: (state) => {
      if (state.currentEventIndex === undefined) {
        return;
      }
      state.currentEventIndex = state.event.ids.length - 1;
    },
    eventBack: (state) => {
      if (
        state.currentEventIndex === undefined ||
        state.currentEventIndex === 0
      ) {
        return;
      }
      state.currentEventIndex--;
    },
    eventForward: (state) => {
      if (
        state.currentEventIndex === undefined ||
        state.currentEventIndex >= state.event.ids.length - 1
      ) {
        return;
      }
      state.currentEventIndex++;
    },
  },
  extraReducers: (builder) => {
    let diaryBuilder = builder.addCase(
      retrieveDeepVampire.fulfilled,
      (state, action) => {
        const deepVampire = action.payload;

        state.vampire = {
          id: deepVampire.id,
          name: deepVampire.name,
          description: deepVampire.description,
          isDead: deepVampire.isDead,
        };

        const events = deepVampire.events;
        if (events.length > 0) {
          const lastEventIndex = events.length - 1;
          state.currentEventIndex = lastEventIndex;
        }

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

    diaryBuilder = diaryBuilder.addCase(
      eventThunk.create.fulfilled,
      (state, action) => {
        eventAdapter.addOne(state.event, action.payload);
        const lastEventIndex = state.event.ids.length - 1;
        state.currentEventIndex = lastEventIndex;
      }
    );

    diaryBuilder = diaryBuilder.addCase(
      eventThunk.update.fulfilled,
      (state, action) => {
        eventAdapter.upsertOne(state.event, action.payload);
      }
    );

    diaryBuilder = diaryBuilder.addCase(
      eventThunk.remove.fulfilled,
      (state, action) => {
        eventAdapter.removeOne(state.event, action.payload);
      }
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

export const { eventStart, eventEnd, eventBack, eventForward } =
  diarySlice.actions;

export const selectVampire = (state: RootState) => state.diary.vampire;

export const selectIsDead = (state: RootState) =>
  state.diary.vampire?.isDead ?? false;

export const selectIsExhausted = (state: RootState) => {
  return (
    selectSkills(state).length === 0 && selectResources(state).length === 0
  );
};

export const selectIsFirstEvent = (state: RootState) => {
  return state.diary.currentEventIndex === 0;
};

export const selectIsLastEvent = (state: RootState) => {
  return (
    state.diary.currentEventIndex !== undefined &&
    state.diary.currentEventIndex === state.diary.event.ids.length - 1
  );
};

export const selectCurrentEventIndex = (state: RootState) =>
  state.diary.currentEventIndex;

export const selectCurrentEvent = (state: RootState) => {
  const index = state.diary.currentEventIndex;
  if (index === undefined) {
    return;
  }

  const id = state.diary.event.ids[index];
  return state.diary.event.entities[id];
};

export const selectPreviousEvent = (state: RootState) => {
  const index = state.diary.currentEventIndex;
  if (index === undefined || index === 0) {
    return;
  }

  const previousIndex = index - 1;
  const previousId = state.diary.event.ids[previousIndex];
  return state.diary.event.entities[previousId];
};

export const eventSelectors = eventAdapter.getSelectors(
  (state: RootState) => state.diary.event
);

export const memorySelectors = memoryAdapter.getSelectors(
  (state: RootState) => state.diary.memory
);

export const selectMemories = (state: RootState) => {
  return memorySelectors
    .selectAll(state)
    .filter((memory) => !memory.isForgotten && memory.diary === null);
};

export const experienceSelectors = experienceAdapter.getSelectors(
  (state: RootState) => state.diary.experience
);

export const skillSelectors = skillAdapter.getSelectors(
  (state: RootState) => state.diary.skill
);

export const selectSkills = (state: RootState) => {
  return skillSelectors.selectAll(state).filter((skill) => !skill.isChecked);
};

export const resourceSelectors = resourceAdapter.getSelectors(
  (state: RootState) => state.diary.resource
);

export const selectResources = (state: RootState) => {
  return resourceSelectors
    .selectAll(state)
    .filter((resource) => !resource.isLost);
};

export const selectDiary = (state: RootState) => {
  return (
    resourceSelectors
      .selectAll(state)
      .find((resource) => resource.isDiary && !resource.isLost) ?? null
  );
};

export const selectIsDiaryFull = (state: RootState) => {
  const diary = selectDiary(state);
  return (
    diary !== null &&
    memorySelectors
      .selectAll(state)
      .filter((memory) => memory.diary === diary.id).length >=
      DIARY_MEMORY_CAPACITY
  );
};

export const characterSelectors = characterAdapter.getSelectors(
  (state: RootState) => state.diary.character
);

export const selectCharacters = (state: RootState) => {
  return characterSelectors
    .selectAll(state)
    .filter((character) => !character.isDead);
};

export const markSelectors = markAdapter.getSelectors(
  (state: RootState) => state.diary.mark
);
