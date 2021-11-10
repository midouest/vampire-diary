export interface DeepVampire {
  id: number;
  name: string;
  description: string;
  isDead: boolean;

  events: Event[];
  memories: Memory[];
  experiences: Experience[];
  skills: Skill[];
  resources: Resource[];
  characters: Character[];
  marks: Mark[];
}

export interface Event {
  id: number;
  vampire: number;
  prompt: number;
  promptDescription: number;
  visit: string;
  description: string;
}

export interface CreateEventFormData {
  vampire: number;
}

export interface UpdateEventFormData {
  id: number;
  description: string;
}

export interface Memory {
  id: number;
  vampire: number;
  diary: number | null;
  isForgotten: boolean;
}

export interface CreateMemoryFormData {
  vampire: number;
}

export interface UpdateMemoryFormData {
  id: number;
  diary: number | null;
  isForgotten: boolean;
}

export interface Experience {
  id: number;
  memory: number;
  description: string;
}

export interface CreateExperienceFormData {
  memory: number;
  description: string;
}

export interface UpdateExperienceFormData {
  id: number;
  description: string;
}

export interface Skill {
  id: number;
  vampire: number;
  description: string;
  isChecked: boolean;
}

export interface CreateSkillFormData {
  vampire: number;
  description: string;
}

export interface UpdateSkillFormData {
  id: number;
  description: string;
  isChecked: boolean;
}

export interface Resource {
  id: number;
  vampire: number;
  description: string;
  isDiary: boolean;
  isLost: boolean;
}

export interface CreateResourceFormData {
  vampire: number;
  description: string;
  isDiary: boolean;
}

export interface UpdateResourceFormData {
  id: number;
  description: string;
  isDiary: boolean;
  isLost: boolean;
}

export interface Character {
  id: number;
  vampire: number;
  name: string;
  description: string;
  isImmortal: boolean;
  isDead: boolean;
}

export interface CreateCharacterFormData {
  vampire: number;
  name: string;
  description: string;
  isImmortal: boolean;
}

export interface UpdateCharacterFormData {
  id: number;
  name: string;
  description: string;
  isImmortal: boolean;
  isDead: boolean;
}

export interface Mark {
  id: number;
  vampire: number;
  description: string;
}

export interface CreateMarkFormData {
  vampire: number;
  description: string;
}

export interface UpdateMarkFormData {
  id: number;
  description: string;
}
