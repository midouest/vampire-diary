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