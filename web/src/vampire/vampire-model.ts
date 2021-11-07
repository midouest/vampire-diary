export interface Vampire {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVampireFormData {
  promptGroup: number;
  name: string;
  description: string;
}

export interface UpdateVampireFormData {
  id: number;
  name: string;
  description: string;
}