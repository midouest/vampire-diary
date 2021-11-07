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
