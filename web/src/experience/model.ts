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
