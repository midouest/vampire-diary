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
