export interface Character {
  id: number;
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

export interface Event {
  id: number;
  vampire: number;
  prompt: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventFormData {
  vampire: number;
}

export interface UpdateEventFormData {
  id: number;
  description: string;
}

export interface Experience {
  id: number;
  memory: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExperienceFormData {
  memory: number;
  description: string;
}

export interface UpdateExperienceFormData {
  id: number;
  description: string;
}

export interface Mark {
  id: number;
  vampire: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMarkFormData {
  vampire: number;
  description: string;
}

export interface UpdateMarkFormData {
  id: number;
  description: string;
}

export interface Memory {
  id: number;
  vampire: number;
  diary: number | null;
  isForgotten: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemoryFormData {
  vampire: number;
}

export interface UpdateMemoryFormData {
  id: number;
  diary: number | null;
  isForgotten: boolean;
}

export interface Prompt {
  id: number;
  group: number;
  order: number;
  descriptionA: string;
  descriptionB: string | null;
  descriptionC: string | null;
  is_game_over: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: number;
  vampire: number;
  description: string;
  isDiary: boolean;
  isLost: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface Skill {
  id: number;
  vampire: number;
  description: string;
  isChecked: boolean;
  createdAt: string;
  updatedAt: string;
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
