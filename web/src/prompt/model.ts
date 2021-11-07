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
