export interface Event {
  id: number;
  vampire: number;
  prompt: Prompt;
  visit: number;
  description: string;
}

export interface Prompt {
  id: number;
  group: number;
  order: number;
  descriptionA: string;
  descriptionB: string | null;
  descriptionC: string | null;
  is_game_over: boolean;
}

export interface CreateEventFormData {
  vampire: number;
}

export interface UpdateEventFormData {
  id: number;
  description: string;
}
